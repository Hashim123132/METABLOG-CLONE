/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// src/routes/auth.js
import dotenv from "dotenv";
dotenv.config();

import { JWT_SECRET } from "../index.js"; // Make sure index.js exports JWT_SECRET
import User from "../models/User.js";
import axios from "axios";
import express from "express";
import bcrypt from "bcryptjs";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";

const router = express.Router();

// Send verification email
async function sendVerificationEmail(email, code) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
  const verificationLink = `${FRONTEND_URL}/verify?code=${code}&email=${encodeURIComponent(email)}`;

  await transporter.sendMail({
    from: '"MetaBlog-Clone" <no-reply@MetaBlog-Clone.com>',
    to: email,
    subject: "Verify your account",
    html: `<p>Click <a href="${verificationLink}">here</a> to verify your account.</p>`,
  });
}

// Google OAuth2 Client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Error response helper
const sendErrorResponse = (res, message, status = 500) => {
  console.error(message);
  res.status(status).json({ success: false, message });
};

// Signup
router.post("/Signup", async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return sendErrorResponse(res, "Email, password, and name are required.", 400);
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return sendErrorResponse(res, "User already exists.", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = crypto.randomBytes(20).toString("hex");

    user = new User({
      email,
      name,
      password: hashedPassword,
      verificationCode,
      isVerified: false,
    });

    await user.save();
    await sendVerificationEmail(email, verificationCode);

    res.json({
      success: true,
      message: "Signup successful. Please check your email to verify your account.",
    });
  } catch (error) {
    console.error("Error during Signup:", error.message);
    sendErrorResponse(res, "Error during Signup", 500);
  }
});

// Verify email
router.get("/verify", async (req, res) => {
  const { code, email } = req.query;

  const user = await User.findOne({ email, verificationCode: code });

  if (!user) {
    return res.redirect("http://localhost:5173/verify?status=invalid");
  }

  user.isVerified = true;
  user.verificationCode = undefined;
  await user.save();

  res.json({ success: true, message: "Account verified successfully!" });
});

// Resend verification email
router.post("/resend-verification", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return sendErrorResponse(res, "Email is required.", 400);
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return sendErrorResponse(res, "User not found.", 404);
    }

    if (user.isVerified) {
      return sendErrorResponse(res, "User is already verified.", 400);
    }

    const verificationCode = crypto.randomBytes(20).toString("hex");
    user.verificationCode = verificationCode;
    await user.save();

    await sendVerificationEmail(user.email, verificationCode);

    res.json({
      success: true,
      message: "Verification email resent. Please check your inbox.",
    });
  } catch (error) {
    console.error("Error resending verification email:", error);
    sendErrorResponse(res, "Failed to resend verification email", 500);
  }
});

// Login
router.post("/Login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return sendErrorResponse(res, "Email and password are required.", 400);
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return sendErrorResponse(res, "Invalid email or password.", 400);
    }

    if (!user.isVerified) {
      return sendErrorResponse(res, "Please verify your email before logging in.", 403);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendErrorResponse(res, "Invalid email or password.", 400);
    }

    const authToken = jwt.sign({ user: { id: user.id } }, JWT_SECRET, { expiresIn: "1h" });

    res.json({
      success: true,
      authToken,
      message: "User logged in successfully",
    });
  } catch (error) {
    sendErrorResponse(res, "Error during login", 500);
  }
});

// Google login/signup
router.post("/google-login", async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return sendErrorResponse(res, "Google token is missing in the request body", 400);
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, sub: googleId } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ name, email, googleId });
      await user.save();
    }

    const authToken = jwt.sign({ user: { id: user.id } }, JWT_SECRET, { expiresIn: "1h" });

    res.json({
      success: true,
      authToken,
      message: user.googleId ? "User logged in with Google" : "User signed up with Google",
    });
  } catch (error) {
    sendErrorResponse(res, "Error during Google login/Signup", 500);
  }
});

// Google OAuth callback
router.get("/api/auth/google/callback", async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return sendErrorResponse(res, "Authorization code is missing in the query", 400);
  }

  try {
    const tokenUrl = "https://oauth2.googleapis.com/token";
    const params = {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: "http://localhost:5000/api/auth/google/callback",
      grant_type: "authorization_code",
    };

    const response = await axios.post(tokenUrl, null, { params });
    const { id_token } = response.data;

    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, sub: googleId } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ name, email, googleId });
      await user.save();
    }

    const authToken = jwt.sign({ user: { id: user.id } }, JWT_SECRET, { expiresIn: "1h" });

    const redirectUrl = "http://localhost:5173";
    res.redirect(`${redirectUrl}/?authToken=${authToken}`);
  } catch (error) {
    sendErrorResponse(res, "Error during Google OAuth callback", 500);
  }
});

export default router;
