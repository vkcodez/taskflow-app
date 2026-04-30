<<<<<<< HEAD
const { userDB, taskDB } = require('./jsonDB');

const connectDB = async () => {
  try {
    // Initialize JSON database (files are created automatically by jsonDB.js)
    console.log(`✅ JSON Database initialized at: ${__dirname}/../data/`);
    return true;
  } catch (err) {
    console.error(`❌ Database initialization error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
=======
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || process.env.DB_LOCAL_URI;
    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`❌ MongoDB connection error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
>>>>>>> c373036557a179238c89ebf5cfe37286a14e9aad
