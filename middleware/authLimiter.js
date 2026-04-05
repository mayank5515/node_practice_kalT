const { RateLimiterMongo } = require("rate-limiter-flexible");
const mongoose = require("mongoose");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const maxAttemptsByIpUsername = 10;
const maxAttemptsPerDay = 100;

//We are rate limiting by Ip & Username , 10 attempts in 10 mins
const emailIpBruteLimiter = new RateLimiterMongo({
  storeClient: mongoose.connection,
  points: maxAttemptsByIpUsername,
  duration: 60 * 10, //time period of max requests sent before being blocked
  blockDuration: 60 * 60 * 24,
  dbName: "blog_app",
});
/*
We need to create another rate limiter responsible for handling requests that take longer cause with the limiter we created above the attacker can send 9 requests per 10 min for months without getting detected and blocked.
*/
//Limits the total number of login attempts from an IP address within 24 hours
const slowerBruteLimiter = new RateLimiterMongo({
  storeClient: mongoose.connection,
  points: maxAttemptsPerDay,
  duration: 60 * 10, // number of attemps in what time ?
  blockDuration: 60 * 60 * 24,
  dbName: "blog_app",
});

const authLimiter = async (req, res, next) => {
  //Call .get method on with ipAddress and email&ip combination pass these as parameters to get method
  //from their response find out if points consumed are greater than max and if they are , set retry-after header with retrySeconds (caculated from bsBeforeNext) and send error too many requests
  const ipAddress = req.connection.remoteAddress;
  const emailIpKey = `${req.body.email} ${ipAddress}`;
  const [slowerRateLimiterRes, emailIpRateLimiterRes] = await Promise.all([
    slowerBruteLimiter.get(ipAddress),
    emailIpBruteLimiter.get(emailIpKey),
  ]);
  console.log("INSIDE AUTH LIMITER");
  console.log(
    "Slower RL Res : ",
    slowerRateLimiterRes,
    " Email RL Res",
    emailIpRateLimiterRes,
  );
  console.log(
    "SRLRES Consumed Points: ",
    slowerRateLimiterRes?.consumedPoints,
    " ERLRES ",
    emailIpRateLimiterRes?.consumedPoints,
  );
  let retrySeconds = 0;
  const slowerPoints = slowerRateLimiterRes?.consumedPoints || 0;
  const emailPoints = emailIpRateLimiterRes?.consumedPoints || 0;
  if (slowerRateLimiterRes && slowerPoints >= maxAttemptsPerDay) {
    retrySeconds = Math.floor(slowerRateLimiterRes.msBeforeNext / 1000) || 1; //msBeforeNext is blocked duration in ms
  } else if (emailIpRateLimiterRes && emailPoints >= maxAttemptsByIpUsername) {
    retrySeconds = Math.floor(emailIpRateLimiterRes.msBeforeNext / 1000) || 1;
  }
  console.log("Retry seconds: ", retrySeconds);
  if (retrySeconds > 0) {
    res.set("Retry-After", String(retrySeconds));
    return next(
      new ApiError(httpStatus.status.TOO_MANY_REQUESTS, "Too many requests!!!"),
    );
  }

  next();
};

module.exports = {
  emailIpBruteLimiter,
  slowerBruteLimiter,
  authLimiter,
};
