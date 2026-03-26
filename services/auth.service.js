const ApiError = require("../utils/ApiError");
const { userService } = require("../services");
const httpStatus = require("http-status");
exports.login = async (email, password) => {
  //get email and password from the user and compare them
  const user = await userService.getUserWithEmail(email);
  if (!user && !user.comparePasswords(password)) {
    return next(
      new ApiError(
        httpStatus.status.UNAUTHORIZED,
        "Incorrect email or password",
      ),
    );
  }
  return user;
};
