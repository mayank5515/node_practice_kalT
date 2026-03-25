const Token = required("../model/token.model.js");
const User = required("../model/user.model.js");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");

exports.register = catchAsync((req, res, next) => {
  //create user (first check if user exists ? )
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(
      new ApiError(
        401,
        "Please provide name , email and password for registrating the user!",
      ),
    );
  }
  if (User.findByEmail(email)) {
    return next(
      new ApiError(401, `User with this ${email} email already exists!`),
    );
  }
  //create token
});
