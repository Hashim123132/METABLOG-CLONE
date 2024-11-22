const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

const JWT_SECRET = process.env.JWT_SECRET || 'abc3477@!23'; // Store secret in environment variable

// Route 1: Create a new user (POST "/api/auth/createuser")
router.post('/createuser', [
  body('name', 'Name must be at least 3 characters long').isLength({ min: 3 }),
  body('email', 'Invalid email').isEmail(),
  body('password', 'Password must be at least 5 characters long').isLength({ min: 5 })
], async (req, res) => {
  let success = false;

  // Validate the request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success,
      errors: errors.array()
    });
  }

  const { name, email, password } = req.body;

  try {
    // Check if the user already exists with the provided email
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success,
        error: 'Sorry, a user with this email already exists'
      });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(password, salt);

    // Create a new user
    user = new User({
      name,
      email,
      password: secPassword
    });

    // Save the user to the database
    await user.save();

    // Prepare payload for JWT token
    const payload = {
      user: { id: user.id }
    };

    // Generate JWT token
    const authToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    success = true;
    res.json({
      success,
      authToken,
      message: 'User registered successfully'
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Route 2: Authenticate a user (POST "/api/auth/login")
router.post('/login', [
  body('email', 'Invalid email').isEmail(),
  body('password', 'Password cannot be blank').exists()
], async (req, res) => {
  let success = false;

  // Validate the request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success,
      errors: errors.array()
    });
  }

  const { email, password } = req.body;

  try {
    // Check if the user exists with this email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success,
        error: 'Try logging with correct credentials'
      });
    }

    // Compare password with the hash stored in the database
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({
        success,
        error: 'Try logging with correct credentials'
      });
    }

    // Prepare payload for JWT token
    const data = {
      user: { id: user.id }
    };

    // Generate JWT token
    const authToken = jwt.sign(data, JWT_SECRET);

    success = true;
    res.json({
      success,
      authToken
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

router.get('/getuser', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
