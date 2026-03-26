const Joi = require("joi");
const password = require("./custom.validation");
const createUserSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.custom(password).required(),
  }),
};

module.exports = {
  createUserSchema,
};
