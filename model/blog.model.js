const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Blog must have a title"],
      unique: true,
      maxLength: [100, "Blog title can have at max 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Blog must have a description"],
      minLength: [1, "Description minimum length is 1"],
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
