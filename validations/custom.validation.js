const validator = require("validator");

const password = (value, helpers) => {
  if (
    !validator.isStrongPassword(value, {
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minUppercase: 1,
      minSymbols: 1,
    })
  ) {
    return helpers.message(
      "Password should at least be 8 characters with one uppercase and lowercase letter, number, and special character",
    );
  }
  return value;
};

module.exports = password;
