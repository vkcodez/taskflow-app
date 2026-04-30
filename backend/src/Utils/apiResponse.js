<<<<<<< HEAD
// ♻️ Reusable: Consistent API response shape across all controllers
const sendSuccess = (res, statusCode = 200, message = 'Success', data = {}) => {
  res.status(statusCode).json({ success: true, message, data });
};

const sendError = (res, statusCode = 500, message = 'Server Error') => {
  res.status(statusCode).json({ success: false, message });
};

=======
// ♻️ Reusable: Consistent API response shape across all controllers
const sendSuccess = (res, statusCode = 200, message = 'Success', data = {}) => {
  res.status(statusCode).json({ success: true, message, data });
};

const sendError = (res, statusCode = 500, message = 'Server Error') => {
  res.status(statusCode).json({ success: false, message });
};

>>>>>>> c373036557a179238c89ebf5cfe37286a14e9aad
module.exports = { sendSuccess, sendError };