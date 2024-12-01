const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String }, // For traditional login
  googleId: { type: String }, // For Google login
  image: { type: String}, 
});

module.exports = mongoose.model('User', userSchema);
