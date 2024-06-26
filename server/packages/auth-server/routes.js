const express = require('express');
const { check } = require('express-validator');
const authRouter = express.Router();
const middleware = require('./utils/middleware');
const {
  loadUser,
  loginUser,
  registerUser,
  refreshToken,
} = require('./services');

authRouter.get('/user', middleware.tokenExtractor, loadUser);

authRouter.post(
  '/login',
  check('email').isEmail(),
  check('password').isLength({ min: 5 }),
  loginUser
);
authRouter.post(
  '/register',
  check('name').not().isEmpty(),
  check('email').isEmail(),
  check('password').isLength({ min: 5 }),
  registerUser
);
authRouter.post('/refresh', refreshToken);
module.exports = authRouter;
