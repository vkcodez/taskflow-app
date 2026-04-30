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
