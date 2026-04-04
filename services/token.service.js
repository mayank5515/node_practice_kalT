const jwt = require("jsonwebtoken");
const dayjs = require("dayjs");
const { Token, User } = require("../model");
const logger = require("../config/logger");
const tokenTypes = require("../config/tokenConfig");
const config = require("../config/config");

exports.generateToken = (userId, tokenType, tokenExpiresAt) => {
  const payload = {
    sub: userId,
    iat: dayjs().unix(),
    exp: tokenExpiresAt,
    token: tokenType,
  };
  return jwt.sign(payload, config.jwt_secret);
};

//save the token
exports.saveToken = async function (
  token,
  userId,
  type,
  expiresIn,
  blacklisted = false,
) {
  const obj = {
    token,
    userId,
    type,
    expiresIn,
    blacklisted,
  };
  const tokenDoc = await Token.create({
    token,
    user: userId,
    type: type,
    expiresIn: new Date(expiresIn * 1000),
    blacklisted,
  });
  console.log("token doc: ", tokenDoc);
  return tokenDoc;
};

exports.verifyToken = async function (token) {
  //verify jwt
  const payload = jwt.verify(token, config.jwt_secret);
  //check if token exists in database or not
  const tokenDoc = Token.findOne({
    token,
    user: payload.sub,
    blacklisted: false,
  });
  if (!tokenDoc) {
    throw new Error("Token doesnt exist in database !");
  }
  console.log("payload ", payload, " doc ", tokenDoc);
  return tokenDoc;
};

exports.refreshToken = async function (refreshToken) {
  //user access token expires , user sends refresh token
  //server verifies refresh token , checks is user associated with that token exists in database
  // if no , throw error (decide) , else delete old refresh token (or mark as used in database) and send back new access and refresh token back
  try {
    //check if refresh token exists in data base first
    console.log("REFRESH TOKEN FROM TOKEN SERVICE", refreshToken);
    const refreshTokenPayload = jwt.verify(refreshToken, config.jwt_secret);
    const oldTokenDoc = await Token.findOne({
      token: refreshToken,
      blacklisted: false,
    });
    const user = await User.findById(refreshTokenPayload.sub);
    if (!oldTokenDoc) {
      //NOTE: We are throwing an error because maybe user logged out or possible refresh token theft , already used token etc
      throw new Error(
        "Old refresh token doesnt exist in database , try authenticating again!",
      );
    }
    //NOTE: DONOT PLACE THIS CONDITION BEFORE ABOVE ONE
    if (!user) {
      //If token exists but user doesnt, delete this token from database
      await Token.deleteOne({
        token: refreshToken,
      });
      throw new Error(
        "User not found in the database , associated with this token !",
      );
    }
    await Token.deleteOne({
      token: refreshToken,
    }); //check if token was deleted successfully
    const tokens = await this.generateAuthTokens(refreshTokenPayload.sub);
    return tokens;
  } catch (err) {
    logger.error(err);
    console.log(`Err: `, err);
    // console.log("Err stack: ", err.stack);
    console.log("Err message: ", err.message);
    throw new Error(err.message);
  }
};

exports.generateAuthTokens = async function (userId) {
  const accessTokenExpiresAt = dayjs()
    .add(config.jwt_access_token_expiration, "minutes")
    .unix();

  const refreshTokenExpiresAt = dayjs()
    .add(config.jwt_refresh_token_expiration, "days")
    .unix();

  logger.info(
    `Refersh Token time: ${new Date(
      refreshTokenExpiresAt * 1000,
    ).toLocaleString()}`,
  );

  logger.info(
    `Access Token time: 
    ${new Date(accessTokenExpiresAt * 1000).toLocaleString()}
  `,
  );

  const accessToken = this.generateToken(
    userId,
    tokenTypes.ACCESS,
    accessTokenExpiresAt,
  );

  const refreshToken = this.generateToken(
    userId,
    tokenTypes.REFRESH,
    refreshTokenExpiresAt,
  );

  /* --------------------------------------------DELETING OLD REFRESH TOKEN-------------------------------------------------------------- */

  //NOTE: we should delete any refresh tokens in database before generating new one
  //NOTE: Why are we deleting old refresh tokens , because refresh tokens are only being deleted when refreshToken is called thru refresh-token route , during login route , new refresh and access tokens are created for that user even if existing refersh token exists in the database (old refresh token is not being deleted during login functionality)

  const oldRefreshTokens = await Token.find({ user: userId });
  logger.info(`Old Refresh Tokens : ${oldRefreshTokens}`);

  if (oldRefreshTokens.length > 0) {
    await Token.deleteMany({ user: userId });
  }

  /* --------------------------------------------DELETING OLD REFRESH TOKEN-------------------------------------------------------------- */

  const refreshTokenDoc = await this.saveToken(
    refreshToken,
    userId,
    tokenTypes.REFRESH,
    refreshTokenExpiresAt,
    false,
  );

  return {
    access: {
      token: accessToken,
    },
    refresh: {
      token: refreshToken,
    },
  };
};
