const express = require('express');
const validate = require('../middleware/validators.js');
const { createBlogSchema } = require('../validations/blog.validation.js')
const blogController = require('../controller/blog.controller.js');

const router = express.Router();

router.route('/').get(blogController.getAllBlogs).post(validate(createBlogSchema), blogController.createBlog);

router.route('/:id').get(blogController.getBlog).delete(blogController.deleteBlog);

module.exports = router;