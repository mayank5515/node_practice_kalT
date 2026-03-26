const express = require("express");
const router = express.Router();
const { authController } = require("../controller");
const validate = require("../middleware/validators");
const { userValidations } = require("../validations");
router.post(
  "/register",
  validate(userValidations.createUserSchema),
  authController.register,
);

module.exports = router;
