const Blog = require("../model/blog.model.js");

exports.getAllBlogs = async (req, res) => {
  return await Blog.find();
};

exports.createBlog = async (req, res) => {
  const { title, description, author } = req.body;
  return await Blog.create({
    title,
    description,
    author,
  });
};

exports.getBlog = async (req, res) => {
  const { id } = req.params;
  return await Blog.findById(id);
};

exports.deleteBlog = async (req, res) => {
  const { id } = req.params;
  return await Blog.findByIdAndDelete(id);
};
