/* eslint-disable no-undef */
const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Refers to the User model
    required: true,
  },
  image: {
    type: String, // This will store the image URL
    default: null,
 },
 tag: { type: String, required: true }, // New field for the tag



}, 
 { timestamps: true });

module.exports = mongoose.model('Blog', BlogSchema);
