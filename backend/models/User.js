/* eslint-disable no-undef */
import mongoose from "mongoose";

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
const User = mongoose.models.User || mongoose.model("User", userSchema);


export default User;
