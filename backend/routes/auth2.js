/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// contact us backend 
const express = require('express');
const nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');
const crypto = require('crypto');
const router = express.Router();

// Access environment variables
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;
const adminEmail = process.env.ADMIN_EMAIL;

// Middleware to check email configuration
const checkEmailConfig = () => {
  if (!emailUser || !emailPass || !adminEmail) {
    throw new Error('Email configuration is missing');
  }
};

// Helper function to generate a verification token
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit code
};

router.post('/createcontact', [
  body('email').isEmail().withMessage('Invalid email'),
  body('comment').isLength({ min: 3 }).withMessage('Comment must be at least 3 characters long'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { email, comment } = req.body;

  try {
    // Ensure email configuration is present
    checkEmailConfig();

    // Nodemailer setup for sending emails
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: true,
      port: 465,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    // Generate a verification token
    const verificationToken = generateVerificationCode();

    // The URL for email verification (you can change this based on your frontend route)
    const verificationUrl = `http://yourwebsite.com/verify-email?token=${verificationToken}`;

    // Send email to the user with the verification link
    const userMailOptions = {
      from: emailUser,
      to: email,
      subject: 'Please Verify Your Email',
      text: `Dear User, \n\nThank you for your complaint: "${comment}". To verify your email address and complete your complaint submission, please click the link below: \n\n ${verificationUrl}`,
    };

    // Send email to the admin
    const adminMailOptions = {
      from: emailUser,
      to: adminEmail,
      subject: 'New Complaint Submitted',
      text: `A new complaint has been submitted by: ${email} - Complaint: "${comment}"`,
    };

    // Send emails in parallel
    await Promise.all([
      transporter.sendMail(userMailOptions),
      transporter.sendMail(adminMailOptions),
    ]);

    // Inform the user that the verification email was sent
    res.status(201).json({
      success: true,
      message: `We have sent a verification email to ${email}. Please check your inbox and verify your email address.`
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Error submitting complaint.' });
  }
});

// Route to handle email verification (when user clicks the link)
router.get('/verify-email', (req, res) => {
  const token = req.query.token;

  // Validate the token (you should store it in your database and check if it's valid)
  if (!token) {
    return res.status(400).send('Invalid verification link.');
  }

  // If the token is valid, confirm the email and process accordingly (e.g., mark as verified)
  // You can store the token in your database and check if it's valid before confirming.

  // For this example, we're just showing a success message
  res.send('Your email has been successfully verified!');
});

module.exports = router;
