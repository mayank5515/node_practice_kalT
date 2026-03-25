const { string } = require("joi");
const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.schema({
  name: {
    type: string,
    required: [true, "name is required!"],
    minLength: 1,
  },
  password: {
    type: string,
    required: [true, "password is required!"],
    minlength: 8,
    validate: {
      validator: function (el) {
        return validator.isStrongPassword(el, {
          minLength: 8,
          minLowercase: 1,
          minNumbers: 1,
          minUppercase: 1,
          minSymbols: 1,
        });
      },
      message: (props) => `${props.value} is not an valid password!`,
    },
  },
  email: {
    type: string,
    required: [true, "Email is required!!"],
    validate: {
      validator: function (el) {
        console.log("checking what el is this !", el);
        return validator.isEmail(this.email);
      },
      message: (props) => `${props.value} is not an valid email!`,
    },
  },
});

userSchema.static.findByEmail = function (email) {
  return this.find({ email }) ? true : false;
};
const User = mongoose.model("User", userSchema);

module.exports = User;
