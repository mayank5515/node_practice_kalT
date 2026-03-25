const { string, ref } = require("joi");
const mongoose = require("mongoose");
const User = require("./user.model");
const tokenTypes = require("../config/token");

const tokenSchema = new mongoose.Schema(
  {
    token: {
      type: string,
      required: [true, "Token is required !"],
      index: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: string,
      enum: [tokenTypes.ACCESS, tokenTypes.REFRESH],
      required: true,
    },
    expiresIn: {
      type: Date,
      required: true,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps,
  },
);

const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;
