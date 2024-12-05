/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Blog = require('../models/Blog');
const authMiddleware = require('../middleware/authMiddleware');
const googleAuthMiddleware = require('../middleware/googleAuthMiddleware');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Helper function for error handling
const handleError = (res, error, message = 'Internal server error', status = 500) => {
  console.error(error.message); // Logs the error message to the server console
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
    // Check if the request is for profile picture or blog image
    if (req.body.imageType === 'profile') {
      cb(null, profilePicDir); // Save to 'uploads/profile_pic'
    } else {
      cb(null, uploadsDir); // Save to 'uploads' (for blog images)
    }
  },
  filename: (req, file, cb) => {
    // Generate a unique file name using timestamp
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Set up file filter for conditional image types (JPEG for profile, PNG for blog)
const fileFilter = (req, file, cb) => {
  if (req.body.imageType === 'profile' && file.mimetype === 'image/jpeg') {
    // Allow only JPEG for profile pictures
    cb(null, true);
  } else if (req.body.imageType !== 'profile' && file.mimetype === 'image/png') {
    // Allow only PNG for blog images
    cb(null, true);
  } else {
    // Reject other file types
    const error = new Error('Invalid file type');
    error.status = 400;
    cb(error, false);
  }
};
// Create multer upload middleware with storage and file filter
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5MB
}).single('image'); // 'image' is the field name in the form
function uploadErrorHandler(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    // Multer specific errors
    return res.status(400).json({
      success: false,
      message: err.message
    });
  } else if (err) {
    // General errors
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
  next();
}
// 1. Get User Profile (Authenticated)
router.get('/profile', authMiddleware,  async (req, res) => {
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

// 3. Update User Profile who currently exists in db (Authenticated)
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

// 3. Route to update profile for Google authenticated users
router.put('/google/profile', googleAuthMiddleware, [
  // Validation for email (to ensure email is in the right format)
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
    // Find the user by Google ID (from req.user)
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

    // Send back the updated user data
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

// delete profile pic from database

router.delete('/delete-profile-pic', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);  // Find the user by ID

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Get the file path of the current profile picture
    const imagePath = path.join(__dirname, '..', user.image);  

    // If there is a profile picture, delete the file
    if (user.image) {
      // Check if the file exists before deleting it
      fs.unlink(imagePath, (err) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: 'Error deleting the profile picture file',
          });
        }
        
        // After successfully deleting the file, update the user's image to null
        user.image = null;
        user.save()
          .then(updatedUser => {
            res.json({
              success: true,
              message: 'Profile picture deleted successfully',
              data: updatedUser,
            });
          })
          .catch((error) => {
            res.status(500).json({
              success: false,
              message: 'Error updating user profile',
            });
          });
      });
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

    // If the blog has an associated image, delete the image from the file system
    if (blog.image) {
      const imagePath = path.join(__dirname, '..', blog.image); // The path to the image on the server

      // Ensure the file exists before attempting to delete
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

    // Delete the blog
    await blog.deleteOne(); // Delete the blog from the database

    return res.json({
      success: true,
      message: 'Blog and image deleted successfully',
    });
  } catch (error) {
    handleError(res, error, 'Failed to delete blog. Please try again later.');
  }
});


// Get all blogs by a specific author (using authorId)
router.get('/blogs/author/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    // Find all blogs by this author and populate author data
    const blogs = await Blog.find({ author: userId }).populate('author');
    res.json(blogs);  // Send blogs data with populated author
  } catch (err) {
    res.status(500).send(err);
  }
});

// 8. Get a Single Blog by ID (Authenticated)
router.get('/blogs/:id', authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'name email');  // Populate author data if needed

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      });
    }

    res.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    handleError(res, error, 'Failed to fetch blog. Please try again later.');
  }
});

module.exports = router;