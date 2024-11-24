// src/routes/google-auth.js

const express = require('express');
const router = express.Router();
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const axios = require('axios');

// Load environment variables
require('dotenv').config(); // Ensure .env is loaded

// Google OAuth2 Client Setup using environment variables
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const JWT_SECRET = process.env.JWT_SECRET || '12345'; // Fallback JWT secret

// Error response helper
const sendErrorResponse = (res, message, status = 500) => {
  console.error(message);
  res.status(status).json({ success: false, message });
};

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
    sendErrorResponse(res, 'Error during Google login/signup', 500);
  }
});

// Route for Google OAuth Callback (for complete OAuth flow)
router.get('/api/auth/google/callback', async (req, res) => {
  const { code } = req.query; // The authorization code from Google

  if (!code) {
    return sendErrorResponse(res, 'Authorization code is missing in the query', 400);
  }

  try {
    // Step 1: Exchange authorization code for an access token
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
    const redirectUrl ='http://localhost:5173';
    res.redirect(`${redirectUrl}/?authToken=${authToken}`); // Send the token via query param to frontend

  } catch (error) {
    sendErrorResponse(res, 'Error during Google OAuth callback', 500);
  }
});

module.exports = router;
