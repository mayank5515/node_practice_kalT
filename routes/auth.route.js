const express = require("express");

const { register } = require("../controller/auth.controller");
const { createUserSchema } = require("../controller/auth.controller");
const validateMiddleware = require("../middleware/validate");
const router = express.Router();

router.post("/register", validateMiddleware(createUserSchema), register);
