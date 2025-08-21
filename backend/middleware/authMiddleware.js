/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../index.js"; // make sure server.js exports JWT_SECRET

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", ""); // Get token from Authorization header
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Decode the token to get user info
    req.user = decoded.user; // Attach user info to the request object
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Token is not valid" });
  }
};

export default authMiddleware;
