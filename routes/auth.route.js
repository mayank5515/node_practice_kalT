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
