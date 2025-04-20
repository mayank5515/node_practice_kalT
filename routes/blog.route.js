const express = require('express');
const blogController = require('../controller/blog.controller.js');

const router = express.Router();

router.route('/').get(blogController.getAllBlogs).post(blogController.createBlog);

router.route('/:id').get(blogController.getBlog).delete(blogController.deleteBlog);

module.exports = router;