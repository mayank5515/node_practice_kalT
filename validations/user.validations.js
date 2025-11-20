const joi = require("joi");
const { password } = require("./custom.validation");
const createUserSchema = {
  body: joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.custom().required(),
  }),
};

module.exports = { createUserSchema };
