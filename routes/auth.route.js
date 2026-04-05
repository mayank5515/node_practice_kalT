const express = require("express");
const router = express.Router();
const { authController } = require("../controller");
const validate = require("../middleware/validators");
const { userValidations, authValidations } = require("../validations");
const { authLimiter } = require("../middleware/authLimiter");
router.post(
  "/register",
  validate(userValidations.createUserSchema),
  authController.register,
);
//since we are creating Tokens
router.post(
  "/login",
  authLimiter,
  validate(authValidations.loginSchema),
  authController.login,
);

router.get(
  "/refresh-token",
  validate(authValidations.refreshTokenSchema),
  authController.refreshAuthToken,
);
router.get("/", authController.findAllUsers);
router.get("/tokens", authController.findAllTokens);

router.delete("/users", authController.deleteUsers);
router.delete("/tokens", authController.deleteTokens);
module.exports = router;
