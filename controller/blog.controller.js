const Blog = require("../model/blog.model.js");
const catchAsync = require("../utils/catchAsync.js");
const { blogService } = require("../services");
const logger = require("../config/logger");

exports.getAllBlogs = catchAsync(async (req, res) => {
  logger.info(`Authenticated User from getAllBlogs ${req.user}`);
  const blogs = await blogService.getAllBlogs(req, res);
  res.status(200).json({
    status: "success",
    results: blogs.length,
    data: {
      blogs,
    },
  });
});

exports.createBlog = catchAsync(async (req, res) => {
  const blog = await blogService.createBlog(req, res);
  res.status(201).json({
    status: "success",
    data: {
      blog,
    },
  });
});

exports.getBlog = catchAsync(async (req, res) => {
  const blog = await blogService.getBlog(req, res);
  if (!blog) {
    return res.status(404).json({
      status: "fail",
      message: "Blog not found",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      blog,
    },
  });
});

exports.deleteBlog = catchAsync(async (req, res) => {
  const deletedBlogRes = await blogService.deleteBlog(req, res);
  res.status(204).json({
    status: "success",
    data: null,
  });
});

// const { Blog } = require('../model');
// const catchAsync = require('../utils/catchAsync.js');
// exports.getAllBlogs = catchAsync(async (req, res) => {
//     const blogs = await Blog.findAll();
//     res.status(200).json({
//         status: 'success',
//         results: blogs.length,
//         data: {
//             blogs
//         }
//     });

// });

// exports.getBlog = catchAsync(async (req, res) => {

//     if (!req.params.id) {
//         return res.status(400).json({
//             status: 'fail',
//             message: 'Blog ID is required'
//         })
//     }
//     const blog = await Blog.findOne({ where: { id: req.params.id } });
//     if (!blog) {
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Blog not found'
//         })
//     }
//     res.status(200).json({
//         status: 'success',
//         data: {
//             blog
//         }
//     })

// });
// exports.createBlog = catchAsync(async (req, res) => {

//     const { title, description } = req.body;
//     // if (!title || !description) {
//     //     return res.status(400).json({
//     //         status: 'fail',
//     //         message: 'Title and description are required'
//     //     })
//     // }
//     const blog = await Blog.create({
//         title, description
//     })
//     res.status(201).json({
//         status: 'success',
//         data: {
//             blog
//         }
//     })

// })
// exports.deleteBlog = catchAsync(async (req, res) => {
//     if (!req.params.id) {
//         return res.status(400).json({
//             status: 'fail',
//             message: 'Blog ID is required'
//         })
//     }
//     const blog = await Blog.destroy({ where: { id: req.params.id } });
//     if (!blog) {
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Blog not found'
//         })
//     }
//     res.status(204).json({
//         status: 'success',
//         data: null
//     })

// });
