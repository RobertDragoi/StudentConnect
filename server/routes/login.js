const express = require("express");
const { check } = require("express-validator");
const loginRouter = express.Router();
const middleware = require("../utils/middleware");
const { getUser, loginUser } = require("../services/login");
loginRouter.get("/", middleware.tokenExtractor, getUser);

loginRouter.post(
  "/",
  check("email").isEmail(),
  check("password").isLength({ min: 5 }),
  loginUser
);

loginRouter.put("/", middleware.tokenExtractor, middleware.userUpdater);

module.exports = loginRouter;
