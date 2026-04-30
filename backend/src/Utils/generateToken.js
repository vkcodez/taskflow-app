<<<<<<< HEAD
const jwt = require('jsonwebtoken');

// ♻️ Reusable: generates a signed JWT for any user
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

=======
const jwt = require('jsonwebtoken');

// ♻️ Reusable: generates a signed JWT for any user
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

>>>>>>> c373036557a179238c89ebf5cfe37286a14e9aad
module.exports = generateToken;