const Token = require("../model/token.model.js");
const User = require("../model/user.model.js");
const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const { userService, authService, tokenService } = require("../services");
const logger = require("../config/logger");
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
  const tokens = await tokenService.generateAuthTokens(user._id);
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
    tokens,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  //create user (first check if user exists ? )
  const { email, password } = req.body;
  // console.log("user", User);
  if (!email || !password) {
    return next(
      new ApiError(
        401,
        "Please provide email and password for registrating the user!",
      ),
    );
  }
  const ipAddress = req.connection.remoteAddress;
  logger.info(`IP Address :${ipAddress}`);
  //see i shouldnt send user back with res.json , i should be sending jwt token with user data in payload
  const user = await authService.login(email, password, ipAddress);
  const tokens = await tokenService.generateAuthTokens(user._id);
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
    tokens,
  });
});

exports.refreshAuthToken = catchAsync(async (req, res, next) => {
  const { refreshToken } = req.body; //here we are sending back
  if (!refreshToken) {
    return next(
      new ApiError(httpStatus.status.FORBIDDEN, "Refresh Token not found !"),
    );
  }
  console.log("Request body : ", req.body);

  const tokens = await tokenService.refreshToken(refreshToken);
  console.log(`Tokens from refreshAuthToken`, tokens);
  if (!tokens) {
    return next(
      new ApiError(
        httpStatus.status.INTERNAL_SERVER_ERROR,
        "Error generating tokens !",
      ),
    );
  }
  res.status(httpStatus.status.CREATED).json({
    status: "success",
    message: "Tokens generated successfully!",
    tokens,
  });
});

exports.findAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  if (!users) {
    return res.status(200).json({
      status: "success",
      message: "No users were found in the database",
      data: users,
    });
  }
  res.status(200).json({
    status: "success",
    length: users.length,
    data: users,
  });
});
exports.findAllTokens = catchAsync(async (req, res, next) => {
  const tokens = await Token.find();
  if (!tokens) {
    return res.status(200).json({
      status: "success",
      message: "No tokens were found in the database",
      data: tokens,
    });
  }
  res.status(200).json({
    status: "success",
    length: tokens.length,
    data: tokens,
  });
});

exports.deleteTokens = catchAsync(async (req, res, next) => {
  const tokens = await Token.deleteMany();
  res.status(204).json({
    status: "success",
    data: tokens,
  });
});

exports.deleteUsers = catchAsync(async (req, res, next) => {
  const users = await User.deleteMany();
  res.status(204).json({
    status: "success",
    data: users,
  });
});
