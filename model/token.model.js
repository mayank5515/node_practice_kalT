const mongoose = require("mongoose");
const tokenTypes = require("../config/tokenConfig");

const tokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, "Token is required !"],
      index: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
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
    timestamps: true,
  },
);

const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;
