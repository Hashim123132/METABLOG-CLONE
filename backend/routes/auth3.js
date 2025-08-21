/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// dashboard backend
import express from 'express';
import { body, validationResult } from 'express-validator';
import User from '../models/User.js';
import Blog from '../models/Blog.js';
import authMiddleware from '../middleware/authMiddleware.js';
import googleAuthMiddleware from '../middleware/googleAuthMiddleware.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Fix __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Helper function for error handling
const handleError = (res, error, message = 'Internal server error', status = 500) => {
  console.error(error.message);
  res.status(status).json({
    success: false,
    message,
    error: error.message,
  });
};

// Ensure 'uploads' and 'uploads/profile_pic' directories exist
const uploadsDir = path.join(__dirname, '../uploads');
const profilePicDir = path.join(uploadsDir, 'profile_pic');

if (!fs.existsSync(profilePicDir)) {
  fs.mkdirSync(profilePicDir, { recursive: true });
}

// Set up multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (req.body.imageType === 'profile') {
      cb(null, profilePicDir);
    } else {
      cb(null, uploadsDir);
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (req.body.imageType === 'profile' && file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else if (req.body.imageType !== 'profile' && file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    const error = new Error('Invalid file type');
    error.status = 400;
    cb(error, false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
}).single('image');

function uploadErrorHandler(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  } else if (err) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
  next();
}

// 1. Get User Profile (Authenticated)
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
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

// 3. Update User Profile
router.put('/profile', authMiddleware, upload, uploadErrorHandler, [
  body('name').not().isEmpty().withMessage('Name is required'),
  body('email')
    .isEmail().withMessage('A valid email is required')
    .normalizeEmail()
    .custom(async (value, { req }) => {
      const existingUser = await User.findOne({ email: value });
      if (existingUser && existingUser.id !== req.user.id) {
        throw new Error('Email is already taken');
      }
      return true;
    }),
  body('imageType').isIn(['profile', 'blog']).withMessage('Invalid image type'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  const { name, email } = req.body;
  const image = req.file ? `/uploads/profile_pic/${req.file.filename}` : null;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, email, image },
      { new: true, runValidators: true }
    ).select('-password');

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
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
});

// 4. Update Google Auth User Profile
router.put('/google/profile', googleAuthMiddleware, [
  body('name').not().isEmpty().withMessage('Name is required'),
  body('email')
    .isEmail().withMessage('A valid email is required')
    .custom(async (value, { req }) => {
      const existingUser = await User.findOne({ email: value });
      if (existingUser && existingUser.id !== req.user.id) {
        throw new Error('Email is already taken');
      }
      return true;
    }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      errors: errors.array(),
    });
  }

  const { name, email } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { googleId: req.user.id },
      { name, email },
      { new: true }
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
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

// delete profile pic
router.delete('/delete-profile-pic', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const imagePath = path.join(__dirname, '..', user.image);

    if (user.image) {
      if (fs.existsSync(imagePath)) {
        fs.unlink(imagePath, (err) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: 'Error deleting the profile picture file',
            });
          }

          user.image = null;
          user.save()
            .then(updatedUser => {
              res.json({
                success: true,
                message: 'Profile picture deleted successfully',
                data: updatedUser,
              });
            })
            .catch(() => {
              res.status(500).json({
                success: false,
                message: 'Error updating user profile',
              });
            });
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: 'No profile picture found to delete',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

// BLOG ROUTES
router.get('/blogs', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const blogs = await Blog.find({ author: userId });
    res.json({ success: true, data: blogs });
  } catch (error) {
    handleError(res, error);
  }
});

router.get('/blogs/:id', authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'name image');
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    res.json({ success: true, data: blog });
  } catch (error) {
    handleError(res, error);
  }
});

router.post('/blogs', authMiddleware, upload, [
  body('title').not().isEmpty().withMessage('Title is required'),
  body('content').not().isEmpty().withMessage('Content is required'),
  body('tag').not().isEmpty().withMessage('Tag is required')
    .isIn(['technology', 'health', 'lifestyle'])
    .withMessage('Invalid tag'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  const { title, content, tag } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const newBlog = new Blog({
      title,
      content,
      author: req.user.id,
      image,
      tag,
    });

    await newBlog.save();

    res.status(201).json({
      success: true,
      data: newBlog,
    });
  } catch (error) {
    handleError(res, error, 'Failed to create blog. Please try again later.');
  }
});

router.put('/blogs/:id', authMiddleware, upload, async (req, res) => {
  const { title, content } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    if (blog.author.toString() !== req.user.id.toString()) {
      return res.status(403).json({ success: false, message: 'You can only update your own blogs' });
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.image = image || blog.image;

    await blog.save();

    res.json({ success: true, data: blog });
  } catch (error) {
    handleError(res, error, 'Failed to update blog. Please try again later.');
  }
});

router.delete('/blogs/:id', authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    if (blog.author.toString() !== req.user.id.toString()) {
      return res.status(403).json({ success: false, message: 'You can only delete your own blogs' });
    }

    if (blog.image) {
      const imagePath = path.join(__dirname, '..', blog.image);
      if (fs.existsSync(imagePath)) {
        fs.unlink(imagePath, (err) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: 'Error deleting image from file system',
            });
          }
        });
      }
    }

    await blog.deleteOne();

    return res.json({ success: true, message: 'Blog and image deleted successfully' });
  } catch (error) {
    handleError(res, error, 'Failed to delete blog. Please try again later.');
  }
});

router.get('/blogs/author/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const blogs = await Blog.find({ author: userId }).populate('author');
    res.json(blogs);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/blogs/:id', authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'name email');
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    res.json({ success: true, data: blog });
  } catch (error) {
    handleError(res, error, 'Failed to fetch blog. Please try again later.');
  }
});

export default router;
