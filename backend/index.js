/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import crypto from "crypto";
import dotenv from "dotenv";
import connectToMongo from "./db.js";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Setup __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// Initialize express app
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Built-in JSON parsing middleware

// Available Routes
import authRoutes from "./routes/auth.js";
import auth2Routes from "./routes/auth2.js";
import auth3Routes from "./routes/auth3.js";

app.use("/api/auth", authRoutes);
app.use("/api/auth2", auth2Routes);
app.use("/api/auth3", auth3Routes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Generate JWT secret on every restart
export const JWT_SECRET = crypto.randomBytes(64).toString("hex");

// Error Handling Middleware (catch all errors)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ success: false, message: "Something went wrong!" });
});

// Start the server
async function startServer() {
  try {
    await connectToMongo(); // Connect to MongoDB

    app.listen(port, () => {
      console.log(`MetaBlog Clone backend listening on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1); // Exit if the server fails to start
  }
}

startServer(); // Start the server
