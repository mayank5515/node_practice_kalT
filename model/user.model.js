const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required!"],
    },
    password: {
      type: String,
      required: [true, "password is required!"],
      minlength: 8,
      select: false,
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
      type: String,
      required: [true, "Email is required!!"],
      unique: true,
      validate: {
        validator: function (el) {
          console.log("checking what el is this !", el);
          return validator.isEmail(this.email);
        },
        message: (props) => `${props.value} is not an valid email!`,
      },
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", function (next) {
  //hash the password if user instance is modified
  if (this.isModified(this.email)) {
    this.password = bcrypt.hash(this.password, 10);
  }
  next();
});
userSchema.methods.comparePasswords = async function (password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};
userSchema.statics.isEmailAlreadyTaken = async function (email) {
  const userObj = await this.find({ email });
  return userObj.length > 0 ? true : false;
};
const User = mongoose.model("User", userSchema);

module.exports = User;
