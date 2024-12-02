const { OAuth2Client } = require('google-auth-library');

// Create a new instance of OAuth2Client using your Google client ID
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Middleware to verify Google OAuth token
const googleAuthMiddleware = async (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // If token is not provided, return an error
  if (!token) {
    return res.status(401).json({ success: false, message: 'No token, authorization denied' });
  }

  try {
    // Verify the Google ID token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID, // Your Google Client ID
    });

    // Get the payload (user data) from the verified token
    const payload = ticket.getPayload();

    // Attach user info to the request object
    req.user = {
      id: payload.sub,  // Google user ID
      email: payload.email,  // Google email
      name: payload.name,  // Google name
    };

    // Proceed to the next middleware or route handler
    return next();
  } catch (error) {
    // If the token is invalid or verification fails
    return res.status(401).json({ success: false, message: 'Token is not valid' });
  }
};

module.exports = googleAuthMiddleware;
