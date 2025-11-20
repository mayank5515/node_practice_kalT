const joi = require("joi");
const ApiError = require("../utils/ApiError");

//BASICALLY THIS FUNCTION TAKES A SCHEMA AND CALLS A CALLBACK FUNCTION
// and it is used to create an object that contains key:value pairs that are present in req.body with correspondence to key:value pairs in schema
// and validates them against schema provided

const validateMiddleware = (schema) => (req, res, next) => {
  const keys = Object.keys(schema);
  const object = keys.reduce((obj, key) => {
    if (Object.hasOwnProperty.call(req, key)) {
      obj[key] = req[key];
    }
    return obj;
  }, {});

  const { value, error } = Joi.compile(schema).validate(object);
  if (error) {
    const errors = error.details.map((detail) => details.message).join(",");
    return ApiError(400, errors);
  }

  next();
};

module.exports = validateMiddleware;
