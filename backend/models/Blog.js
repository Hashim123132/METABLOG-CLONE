/* eslint-disable no-undef */
import mongoose from "mongoose";

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
const Blog = mongoose.model("Blog", BlogSchema);

export default Blog;
