const ApiError = require("../utils/ApiError");
const { userService } = require("../services");
const httpStatus = require("http-status");
const {
  slowerBruteLimiter,
  emailIpBruteLimiter,
} = require("../middleware/authLimiter");
/*
I have to call consume function on both brute limiter , first on slower brute limiter function and another on emailIpBruteLimiter (only if user exists for this)
this consume function with specific key will consume points and in our auth limit middelware we are checking points consumed by get method 
therefore in this way we are tracking how many requests with same ipAddress and email&IpAddress combo has been sent in specific duration
for  slowerBruteLimiter 100reqs per day and for emailIpBruteLimiter 10 reqs in 10mins
*/
exports.login = async (email, password, ipAddress) => {
  let promiseArr = [slowerBruteLimiter.consume(ipAddress)];

  //get email and password from the user and compare them
  const user = await userService.getUserWithEmail(email);
  //check if user exists in database and password is correct
  if (!user || !(await user.comparePasswords(password))) {
    //if user exists in db but password is wrong
    user &&
      promiseArr.push(emailIpBruteLimiter.consume(`${email} ${ipAddress}`));
    await Promise.all(promiseArr); //run all the promises
    throw new ApiError(
      httpStatus.status.UNAUTHORIZED,
      "Incorrect email or password!",
    );
  }
  return user;
};
