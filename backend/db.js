/* eslint-disable no-undef */
const mongoose = require('mongoose');
require('dotenv').config(); // Load .env file

// Get the Mongo URI from environment variables
const mongooseURI = 'mongodb://127.0.0.1:27017/MetaBlogClone';

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongooseURI);
    console.log("Connected to MongoDB Successfully");
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
}

module.exports = connectToMongo;

// -----------------if want to connect on Mongodb atlas----------

// /* eslint-disable no-undef */
// const mongoose = require('mongoose');
// require('dotenv').config(); // Load .env file

// // Get the Mongo URI from environment variables
// const mongooseURI = process.env.MONGO_URI;

// const connectToMongo = async () => {
//   try {
//     await mongoose.connect(mongooseURI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("Connected to MongoDB Atlas Successfully");
//   } catch (error) {
//     console.log("Error connecting to MongoDB Atlas", error);
//   }
// }

// module.exports = connectToMongo;