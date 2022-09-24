const usersRouter = require('express').Router();
const { check } = require('express-validator');
const middleware = require('../utils/middleware');
const {
  getUsers,
  getUser,
  registerUser,
  updateUser,
} = require('../services/users');

usersRouter.get('/', getUsers);

usersRouter.post(
  '/',
  check('name').not().isEmpty(),
  check('email').isEmail(),
  check('password').isLength({ min: 5 }),
  registerUser
);

usersRouter.get('/:id', getUser);

/* 
 ! Only able to PUT if id matches token id.
 TODO: Superuser might need to be able to modify other users' info.
*/
usersRouter.put(
  '/:id',
  middleware.tokenExtractor,
  updateUser,
  middleware.userUpdater
);

module.exports = usersRouter;
