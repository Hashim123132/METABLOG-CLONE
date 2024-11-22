const express = require('express');
const nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');
const ContactUs = require('../models/ContactUs');

const router = express.Router();

// Access environment variables
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;
const adminEmail = process.env.ADMIN_EMAIL;

// Middleware to check environment variables
const checkEmailConfig = () => {
  if (!emailUser || !emailPass || !adminEmail) {
    throw new Error('Email configuration is missing');
  }
};

router.post('/createcontact', [
  // Validate email and comment
  body('email').isEmail().withMessage('Invalid email'),
  body('comment').isLength({ min: 3 }).withMessage('Comment must be at least 3 characters long'),
], async (req, res) => {
  // Validate request data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { email, comment } = req.body;

  try {
    // Check if email configuration is available
    checkEmailConfig();

    // Save the complaint to the database
    const contactus = await ContactUs.create({ email, comment });

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    // Email details for the user
    const userMailOptions = {
      from: emailUser,
      to: email,
      subject: 'Complaint Submission Confirmation',
      text: `Dear User,\n\nThank you for your complaint: "${comment}". We will get back to you soon.\n\nBest regards,\nSupport Team`,
    };

    // Email details for the admin
    const adminMailOptions = {
      from: emailUser,
      to: adminEmail,
      subject: 'New Complaint Submitted',
      text: `A new complaint has been submitted by the user: ${email}\nComplaint: "${comment}"`,
    };

    // Send emails in parallel
    const sendEmails = async () => {
      try {
        // Send the user confirmation email
        await transporter.sendMail(userMailOptions);
        // Send the admin notification email
        await transporter.sendMail(adminMailOptions);
      } catch (emailError) {
        console.error('Error sending email:', emailError);
        throw new Error('Failed to send email notifications');
      }
    };

    // Execute email sending
    await sendEmails();

    // Respond with success
    return res.status(201).json({
      success: true,
      message: 'Complaint submitted successfully!',
      contact: { id: contactus._id, email: contactus.email },
    });

  } catch (error) {
    console.error('Error processing complaint:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error submitting complaint.',
    });
  }
});

module.exports = router;
