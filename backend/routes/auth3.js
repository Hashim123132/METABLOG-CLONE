const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Blog = require('../models/Blog');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Helper function for error handling
const handleError = (res, error, message = 'Internal server error', status = 500) => {
  console.error(error.message);  // Logs the error message to the server console
  res.status(status).json({
    success: false,
    message,
    error: error.message,
  });
};

// Ensure 'uploads' directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Set up multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir); // Save images to 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name with timestamp
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed'), false);
    }
    cb(null, true);
  }
}).single('image'); // 'image' is the field name in the form

// 1. Get User Profile (Authenticated)
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;  // Get user info from token payload
    const user = await User.findById(userId).select("-password");  // Get user data from DB without password
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    handleError(res, error);
  }
});

// 2. Get Dashboard (Authenticated)
router.get('/dashboard', authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to the dashboard',
  });
});

// 3. Update User Profile (Authenticated)
router.put('/profile', authMiddleware, [
  body('name').not().isEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('A valid email is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  const { name, email } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    handleError(res, error);
  }
});

// 4. Get User Blogs (Authenticated)
router.get('/blogs', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;  // Get the authenticated user's ID
    const blogs = await Blog.find({ author: userId }); // Filter blogs by authorId
    res.json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    handleError(res, error);
  }
});

// 5. Create Blog (Authenticated)
router.post('/blogs', authMiddleware, upload, [
  body('title').not().isEmpty().withMessage('Title is required'),
  body('content').not().isEmpty().withMessage('Content is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  const { title, content } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null; // Store the image URL

  try {
    // Create a new Blog instance
    const newBlog = new Blog({
      title,
      content,
      author: req.user.id,  // The author is set to the logged-in user's ID
      image,  // Store image URL in the blog
    });

    // Save the blog to the database
    await newBlog.save();

    // Return a success response with the new blog data
    res.status(201).json({
      success: true,
      data: newBlog,
    });
  } catch (error) {
    // General error handling
    handleError(res, error, 'Failed to create blog. Please try again later.');
  }
});

// 6. Update Blog (Authenticated, Author check)
router.put('/blogs/:id', authMiddleware, upload, async (req, res) => {
  const { title, content } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null; // Store image URL if uploaded

  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      });
    }

    if (blog.author.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You can only update your own blogs',
      });
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.image = image || blog.image; // Update image if a new one is provided

    await blog.save();

    res.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    handleError(res, error, 'Failed to update blog. Please try again later.');
  }
});

// 7. Delete Blog (Authenticated, Author check)
router.delete('/blogs/:id', authMiddleware, async (req, res) => {
  try {
    // Fetch the blog by ID
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      });
    }

    // Ensure the blog author matches the logged-in user
    if (blog.author.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own blogs',
      });
    }

    // Delete the blog
    await blog.deleteOne(); 

    return res.json({
      success: true,
      message: 'Blog deleted successfully',
    });
  } catch (error) {
    handleError(res, error, 'Failed to delete blog. Please try again later.');
  }
});

module.exports = router;
