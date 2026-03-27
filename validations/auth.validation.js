const Joi = require("joi");
const password = require("./custom.validation");
const loginSchema = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.custom(password).required(),
  }),
};
const refreshTokenSchema = {
  body: Joi.object({
    refreshToken: Joi.string().required(),
  }),
};

module.exports = {
  loginSchema,
  refreshTokenSchema,
};
