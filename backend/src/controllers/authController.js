<<<<<<< HEAD
const { body } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateToken = require('../Utils/generateToken');
const { sendSuccess, sendError } = require('../Utils/apiResponse');

// Validation rules
exports.registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
];

exports.loginValidation = [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password is required')
];

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = User.findOne({ email });
    if (existingUser) return sendError(res, 409, 'Email already registered');

    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);

    sendSuccess(res, 201, 'Account created successfully', {
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) { next(err); }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = User.findOneWithPassword(email);
    if (!user) {
      return sendError(res, 401, 'Invalid email or password');
    }
    
    // Compare password using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendError(res, 401, 'Invalid email or password');
    }

    const token = generateToken(user._id);
    sendSuccess(res, 200, 'Login successful', {
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) { next(err); }
};

exports.getMe = async (req, res) => {
  sendSuccess(res, 200, 'Profile fetched', { user: req.user });
};
=======
const { body } = require('express-validator');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const { sendSuccess, sendError } = require('../Utils/apiResponse');

// Validation rules (exported so routes stay clean)
exports.registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
];

exports.loginValidation = [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password is required')
];

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return sendError(res, 409, 'Email already registered');

    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);

    sendSuccess(res, 201, 'Account created successfully', {
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) { next(err); }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return sendError(res, 401, 'Invalid email or password');
    }

    const token = generateToken(user._id);
    sendSuccess(res, 200, 'Login successful', {
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) { next(err); }
};

exports.getMe = async (req, res) => {
  sendSuccess(res, 200, 'Profile fetched', { user: req.user });
};
>>>>>>> c373036557a179238c89ebf5cfe37286a14e9aad
