const express = require("express");
const router = express.Router();
const { authController } = require("../controller");
const validate = require("../middleware/validators");
const { userValidations, authValidations } = require("../validations");
router.post(
  "/register",
  validate(userValidations.createUserSchema),
  authController.register,
);
router.get(
  "/login",
  validate(authValidations.loginSchema),
  authController.login,
);

module.exports = router;
