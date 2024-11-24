const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Blog = require('../models/Blog');
const authMiddleware = require('../middleware/authMiddleware');

// 1. Get User Profile (Authenticated)
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;  // Get user info from token payload
    const user = await User.findById(userId).select("-password");  // Get user data from DB without password
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});
// 2. Get Dashboard (Authenticated)
router.get('/dashboard', authMiddleware, (req, res) => {
  res.json({
    success: true, 
    message: 'Welcome to the dashboard'
  });
});

// 3. Update User Profile (Authenticated)
router.put('/profile', authMiddleware, [
  body('name').not().isEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('A valid email is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false, 
      errors: errors.array()
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
        message: 'User not found'
      });
    }

    res.json({
      success: true, 
      data: updatedUser
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false, 
      message: 'Internal Server Error'
    });
  }
});

// 4. Get User Blogs (Authenticated)
router.get('/blogs', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const blogs = await Blog.find({ user: userId });
    res.json({ success: true, data: blogs });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

// 5. Create Blog (Authenticated)
router.post('/blog', authMiddleware, [
  body('title').not().isEmpty().withMessage('Title is required'),
  body('content').not().isEmpty().withMessage('Content is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false, 
      errors: errors.array()
    });
  }

  const { title, content } = req.body;

  try {
    const newBlog = new Blog({
      title,
      content,
      author: req.user.id
    });

    await newBlog.save();

    res.status(201).json({
      success: true, 
      data: newBlog
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false, 
      message: 'Failed to create blog. Please try again later.'
    });
  }
});

// 6. Update Blog (Authenticated, Author check)
router.put('/blog/:id', authMiddleware, async (req, res) => {
  const { title, content } = req.body;

  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false, 
        message: 'Blog not found'
      });
    }

    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({
        success: false, 
        message: 'You can only edit your own blogs'
      });
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;

    await blog.save();

    res.json({
      success: true, 
      data: blog
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false, 
      message: 'Failed to update blog. Please try again later.'
    });
  }
});

// 7. Delete Blog (Authenticated, Author check)
router.delete('/blog/:id', authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false, 
        message: 'Blog not found'
      });
    }

    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({
        success: false, 
        message: 'You can only delete your own blogs'
      });
    }

    await blog.remove();

    res.json({
      success: true, 
      message: 'Blog deleted successfully'
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false, 
      message: 'Failed to delete blog. Please try again later.'
    });
  }
});

module.exports = router;
