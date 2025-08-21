/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// src/routes/auth.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const axios = require('axios');
const crypto = require("crypto");
const nodemailer = require("nodemailer"); 

//to send verification email
async function sendVerificationEmail(email, code) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail or SMTP email
      pass: process.env.EMAIL_PASS, // App password or SMTP password
    },
  });
  const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
  const verificationLink = `${FRONTEND_URL}/verify?code=${code}&email=${encodeURIComponent(email)}`;

  await transporter.sendMail({
    from: '"MetaBlog-Clone" <no-reply@MetaBlog-Clone.com>',
    to: email,
    subject: 'Verify your account',
    html: `<p>Click <a href="${verificationLink}">here</a> to verify your account.</p>`,
  });
}

// Load environment variables
require('dotenv').config(); // Ensure .env is loaded

// Google OAuth2 Client Setup using environment variables
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const JWT_SECRET = process.env.JWT_SECRET || ''; // Fallback JWT secret

// Error response helper
const sendErrorResponse = (res, message, status = 500) => {
  console.error(message);
  res.status(status).json({ success: false, message });
};

// Route for traditional Signup (email/password, name)
router.post('/Signup', async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return sendErrorResponse(res, 'Email, password, and name are required.', 400);
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return sendErrorResponse(res, 'User already exists.', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = crypto.randomBytes(20).toString('hex'); // or use nanoid

    user = new User({ email, name, password: hashedPassword, verificationCode, isVerified: false, });
    await user.save();

    // Send the email
    await sendVerificationEmail(email, verificationCode);

    res.json({
      success: true,
      message: 'Signup successful. Please check your email to verify your account.',
    });
  } catch (error) {
    console.error('Error during Signup:', error.message);
    sendErrorResponse(res, 'Error during Signup', 500);
  }
});
//for verification email
router.get('/verify', async (req, res) => {
  const { code, email } = req.query;

  const user = await User.findOne({ email, verificationCode: code });

 if (!user) {
  return res.redirect('http://localhost:5173/verify?status=invalid');
}

  user.isVerified = true;
  user.verificationCode = undefined;
  await user.save();

  res.json({ success: true, message: 'Account verified successfully!' });
});
// Route for resending verification email
router.post('/resend-verification', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return sendErrorResponse(res, 'Email is required.', 400);
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return sendErrorResponse(res, 'User not found.', 404);
    }

    if (user.isVerified) {
      return sendErrorResponse(res, 'User is already verified.', 400);
    }

    // Generate a new verification code
    const verificationCode = crypto.randomBytes(20).toString('hex');
    user.verificationCode = verificationCode;
    await user.save();

    await sendVerificationEmail(user.email, verificationCode);

    res.json({
      success: true,
      message: 'Verification email resent. Please check your inbox.',
    });
  } catch (error) {
    console.error('Error resending verification email:', error);
    sendErrorResponse(res, 'Failed to resend verification email', 500);
  }
});


// Route for traditional login (email/password)
router.post('/Login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return sendErrorResponse(res, 'Email and password are required.', 400);
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return sendErrorResponse(res, 'Invalid email or password.', 400);
    }

    // Check if the user is verified
    if (!user.isVerified) {
      return sendErrorResponse(res, 'Please verify your email before logging in.', 403);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendErrorResponse(res, 'Invalid email or password.', 400);
    }

    const authToken = jwt.sign({ user: { id: user.id } }, JWT_SECRET, { expiresIn: '1h' });

    res.json({
      success: true,
      authToken,
      message: 'User logged in successfully',
    });
  } catch (error) {
    sendErrorResponse(res, 'Error during login', 500);
  }
});
// Route for Google Login/Signup
router.post('/google-login', async (req, res) => {
  const { token } = req.body; // Google token from frontend

  if (!token) {
    return sendErrorResponse(res, 'Google token is missing in the request body', 400);
  }

  try {
    // Verify the Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID, // Ensure the token is for your client ID
    });

    const payload = ticket.getPayload();
    const { email, name, sub: googleId } = payload; // Destructuring payload

    // Check if the user already exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create a new user if they don't exist
      user = new User({ name, email, googleId });
      await user.save();
      console.log(`New user created: ${email}`);
    } else {
      console.log(`Existing user logged in: ${email}`);
    }

    // Generate a JWT token for the authenticated user
    const authToken = jwt.sign({ user: { id: user.id } }, JWT_SECRET, { expiresIn: '1h' });

    // Send the JWT token back to the frontend
    res.json({
      success: true,
      authToken, // Return the generated token
      message: user.googleId ? 'User logged in with Google' : 'User signed up with Google'
    });
  } catch (error) {
    sendErrorResponse(res, 'Error during Google login/Signup', 500);
  }
});

// Route for Google OAuth Callback (for complete OAuth flow)
router.get('/api/auth/google/callback', async (req, res) => {
  const { code } = req.query; // The authorization code from Google

  if (!code) {
    return sendErrorResponse(res, 'Authorization code is missing in the query', 400);
  }

  try {
    // Exchange authorization code for an access token
    const tokenUrl = 'https://oauth2.googleapis.com/token';
    const params = {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET, // Secret stored in .env
      redirect_uri: 'http://localhost:5000/api/auth/google/callback', // Callback URL
      grant_type: 'authorization_code',
    };

    // Exchange code for token
    const response = await axios.post(tokenUrl, null, { params });
    const { id_token } = response.data;

    // Step 2: Verify the ID token
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID, // Ensure the token matches the client ID
    });

    const payload = ticket.getPayload();
    const { email, name, sub: googleId } = payload;

    // Step 3: Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create user if they don't exist
      user = new User({ name, email, googleId });
      await user.save();
    }

    // Step 4: Generate JWT token for the authenticated user
    const authToken = jwt.sign({ user: { id: user.id } }, JWT_SECRET, { expiresIn: '1h' });

    // Step 5: Redirect back to frontend with the token
    const redirectUrl = 'http://localhost:5173';
    res.redirect(`${redirectUrl}/?authToken=${authToken}`); // Send the token via query param to frontend

  } catch (error) {
    sendErrorResponse(res, 'Error during Google OAuth callback', 500);
  }
});

module.exports = router;
