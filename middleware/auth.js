const passport = require("passport");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");

//This funcition is called at the end of Authentication whether successful or not
const verifyCallback = (req, resolve, reject) => async (err, user, info) => {
  if (err) {
    return reject(err);
  }
  if (info?.name === "TokenExpiredError") {
    return reject(new ApiError(401, "Token expired"));
  }

  if (info?.name === "JsonWebTokenError") {
    return reject(new ApiError(401, "Invalid token"));
  }
  if (!user) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, "User not found"));
  }

  req.user = user;
  resolve();
};

const auth = async (req, res, next) => {
  return new Promise((resolve, reject) => {
    //Looks for strategy named "jwt" , Calls its .authenticate() method internally
    passport.authenticate(
      "jwt",
      { session: false },

      verifyCallback(req, resolve, reject),
    )(req, res, next);
  })
    .then(() => next())
    .catch((error) => next(error));
};

module.exports = auth;
