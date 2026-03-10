const jwt = require('jsonwebtoken');

// ♻️ Reusable: generates a signed JWT for any user
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

module.exports = generateToken;