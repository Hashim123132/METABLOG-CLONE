/* eslint-disable no-undef */
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String },        // Traditional login
  googleId: { type: String },        // Google login
  image: { type: String },

  //  For email verification
  isVerified: { type: Boolean, default: false },
  verificationCode: { type: String },
  verificationCodeExpires: { type: Date },
});

module.exports = mongoose.model('User', userSchema);
