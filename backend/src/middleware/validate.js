const { validationResult } = require('express-validator');
const { sendError } = require('../Utils/apiResponse');

// ♻️ Reusable: Runs after express-validator checks, returns first error
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendError(res, 400, errors.array()[0].msg);
  }
  next();
};

module.exports = validate;