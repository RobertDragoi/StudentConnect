const usersRouter = require('express').Router();
const middleware = require('./utils/middleware');
const { getUsers, getUser, updateUser } = require('./services');

usersRouter.get('/', getUsers);

usersRouter.get('/:id', getUser);

/* 
 ! Only able to PUT if id matches token id.
 TODO: Superuser might need to be able to modify other users' info.
*/
usersRouter.put(
  '/',
  middleware.tokenExtractor,
  updateUser,
  middleware.userUpdater
);

module.exports = usersRouter;
