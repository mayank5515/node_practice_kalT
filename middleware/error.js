const config = require("../config/config.js");
// const sequelize = require('sequelize');
const mongoose = require("mongoose");
const HttpStatus = require("http-status");
const ApiError = require("../utils/ApiError.js");
const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (config.node_env === "production" && !err.isOperational) {
    statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    message = "Something went wrong";
  }
  const response = {
    error: true,
    message: err.message || "Something went wrong",
    statusCode: err.statusCode || 500,
    ...(config.node_env === "development" && { stack: err.stack }),
  };

  res.locals.errorMessage = message; // for logging in development mode

  if (config.node_env === "development") {
    console.log('Error from error middleware "development" ', err);
  }
  res.status(response.statusCode).json(response);
};

const errorConverter = (err, req, res, next) => {
  let error = err;
  // console.log('Error at the start: ', error);
  if (!(err instanceof ApiError)) {
    // console.log("Instace of mongooseError", mongoose.MongooseError);
    //not formated error //btw ApiError are operational errors
    const statusCode =
      error.statusCode || error instanceof mongoose.MongooseError ? 400 : 500;
    // const statusCode = error.statusCode || error instanceof sequelize.ValidationError ? 400 : 500;
    const message = error.message || HttpStatus[statusCode].message;
    error = new ApiError(statusCode, message, false, err.stack); //formated error
    // console.log("Error after formatting: ", error);
  }
  next(error); // will go in errorHandler middleware
};

module.exports = {
  errorHandler,
  errorConverter,
};
