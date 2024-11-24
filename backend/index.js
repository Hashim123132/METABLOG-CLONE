require('dotenv').config();
const connectToMongo = require('./db'); 
const express = require('express');
const cors = require('cors');




// Initialize express app
const app = express();
const port = 5000;

// Middleware
app.use(cors()); 
app.use(express.json()); // Built-in JSON parsing middleware

// Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/auth2', require('./routes/auth2'));
app.use('/api/auth3', require('./routes/auth3'));




// Error Handling Middleware (catch all errors)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Something went wrong!' });
});

// Start the server
async function startServer() {
  try {
    await connectToMongo(); // Connect to MongoDB

    app.listen(port, () => {
      console.log(`MetaBlog Clone backend listening on port ${port}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1); // Exit if the server fails to start
  }
}

startServer(); // Start the server
