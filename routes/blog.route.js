const express = require("express");
const validate = require("../middleware/validators.js");
const { blogValidations } = require("../validations");
const { blogController } = require("../controller");
const auth = require("../middleware/auth");

const router = express.Router();

router
  .route("/")
  .get(auth, blogController.getAllBlogs)
  .post(validate(blogValidations.createBlogSchema), blogController.createBlog);

router
  .route("/:id")
  .get(blogController.getBlog)
  .delete(blogController.deleteBlog);

module.exports = router;
