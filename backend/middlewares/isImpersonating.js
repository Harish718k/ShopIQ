const ErrorHandler = require("../utils/errorHandler");

module.exports = (req, res, next) => {
  const originalAdmin = req.cookies.originalAdmin;

  if (!originalAdmin) {
    return next(new ErrorHandler("Access denied. Not impersonating.", 403));
  }

  next();
};