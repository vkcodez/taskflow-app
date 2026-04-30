const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendError } = require('../Utils/apiResponse');

// ♻️ Reusable: Attach req.user from JWT on any protected route
const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return sendError(res, 401, 'Not authorized. No token provided.');
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user by ID from JSON database
    const user = User.findById(decoded.id);
    if (!user) return sendError(res, 401, 'User no longer exists.');
    
    // Create clean user object without password
    req.user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    };
    next();
  } catch (err) {
    sendError(res, 401, 'Invalid or expired token.');
  }
};

// ♻️ Reusable: Role-based access guard
const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return sendError(res, 403, 'You do not have permission to perform this action.');
  }
  next();
};

module.exports = { protect, authorize };