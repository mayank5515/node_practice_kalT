const jwt = require("jsonwebtoken");
const dayjs = require("dayjs");
const tokenTypes = require("../config/tokenConfig");
const config = require("../config/config");
const generateAuthToken = (userId) => {
  const payload = {
    sub: userId,
    iat: dayjs().unix(),
    exp: dayjs().add(config.jwt_token_expires_in, "minutes").unix(),
    token: tokenTypes.ACCESS,
  };
  return jwt.sign(payload, config.jwt_secret);
};

module.exports = generateAuthToken;
