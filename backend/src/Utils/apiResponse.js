// ♻️ Reusable: Consistent API response shape across all controllers
const sendSuccess = (res, statusCode = 200, message = 'Success', data = {}) => {
  res.status(statusCode).json({ success: true, message, data });
};

const sendError = (res, statusCode = 500, message = 'Server Error') => {
  res.status(statusCode).json({ success: false, message });
};

module.exports = { sendSuccess, sendError };