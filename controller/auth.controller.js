const Token = require("../model/token.model.js");
const User = require("../model/user.model.js");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const { userService } = require("../services");
const generateAuthToken = require("../services/token.service.js");

exports.register = catchAsync(async (req, res, next) => {
  //create user (first check if user exists ? )
  const { name, email, password } = req.body;
  // console.log("user", User);
  if (!name || !email || !password) {
    return next(
      new ApiError(
        401,
        "Please provide name , email and password for registrating the user!",
      ),
    );
  }
  // console.log("value", await User.isEmailAlreadyTaken(email));
  if ((await User.isEmailAlreadyTaken(email)) === true) {
    return next(
      new ApiError(401, `User with this ${email} email already exists!`, 401),
    );
  }
  const user = await userService.createUser(req, res);
  //create token
  const token = generateAuthToken(user._id);
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
    token,
  });
});
