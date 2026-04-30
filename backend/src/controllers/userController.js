<<<<<<< HEAD
const User = require('../models/User');
const { sendSuccess } = require('../Utils/apiResponse');

exports.getProfile = async (req, res) => {
  sendSuccess(res, 200, 'Profile fetched', { user: req.user });
};

exports.updateProfile = async (req, res, next) => {
  try {
    const allowedFields = ['name', 'avatar'];
    const updates = {};
    allowedFields.forEach(field => { if (req.body[field]) updates[field] = req.body[field]; });

    const user = User.findByIdAndUpdate(req.user._id, updates);
    sendSuccess(res, 200, 'Profile updated', { user });
  } catch (err) { next(err); }
};
=======
const User = require('../models/User');
const { sendSuccess } = require('../Utils/apiResponse');

exports.getProfile = async (req, res) => {
  sendSuccess(res, 200, 'Profile fetched', { user: req.user });
};

exports.updateProfile = async (req, res, next) => {
  try {
    const allowedFields = ['name', 'avatar'];
    const updates = {};
    allowedFields.forEach(field => { if (req.body[field]) updates[field] = req.body[field]; });

    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true, runValidators: true });
    sendSuccess(res, 200, 'Profile updated', { user });
  } catch (err) { next(err); }
};
>>>>>>> c373036557a179238c89ebf5cfe37286a14e9aad
