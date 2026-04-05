const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const User = require("../model/user.model");
const config = require("./config");
const tokenTypes = require("../config/tokenConfig");
const logger = require("../config/logger");
const jwtOptions = {
  secretOrKey: config.jwt_secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

//this function is for when jwt is verified internally during .authenticate (after successfull authentication) , we check if user is valid or not
const jwtVerify = async (payload, done) => {
  try {
    console.log("payload ", payload);

    logger.info(
      `${String(payload.token)} Token will expire at ${new Date(payload.exp * 1000).toLocaleTimeString()}`,
    );

    if (payload.token !== tokenTypes.ACCESS) {
      return done(null, false); // ❗ don't throw here
    }

    const user = await User.findById(payload.sub);
    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = jwtStrategy;
