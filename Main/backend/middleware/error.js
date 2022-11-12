const ErrorHandler = require("../utils/error-handler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Error: Wrong id in mongoDB
  if (err.name == "CastError") {
    const message = `Resource not found. Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Error: Duplicate key in mongoDB
  // "E11000 duplicate key error collection: room-rental.users index: email_1 dup key: { email: \"einestimono02@gmail.com\" }"
  if (err.code == 11000) {
    const message = `${Object.keys(err.keyValue)} already exists`;
    err = new ErrorHandler(message, 400);
  }

  // Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Token is invalid, Try again `;
    err = new ErrorHandler(message, 400);
  }

  // JWT EXPIRE error
  if (err.name === "TokenExpiredError") {
    const message = `Token is Expired, Try again `;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
