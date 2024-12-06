const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.CONNECTION_STRING;
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;