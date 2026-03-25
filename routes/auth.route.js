const express = require("express");
const router = express.Router();
const { authController } = require("./../controllers");

router.post("/auth/register", authController.register);

module.exports = router;
