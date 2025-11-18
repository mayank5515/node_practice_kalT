const User = require("../model/user.model");
const Token = require("../model/token.model");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");

exports.signUp = catchAsync(async (req, res) => {
  //i need email and password also name as well
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(ApiError(400, "Please provide name , email and password ! "));
  }
  if (await User.findOne({ email })) {
    return next(ApiError(400, "User with this email already exists!"));
  }
  // create new user
  const newUser = await User.create({
    name,
    email,
    password,
  });

  // send the token
});
