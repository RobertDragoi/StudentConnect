const userRouter = require('express').Router();
const middleware = require('./utils/middleware');
const { getUsers, getUser, updateUser } = require('./services');

userRouter.get('/', getUsers);

userRouter.get('/:id', getUser);

/* 
 ! Only able to PUT if id matches token id.
 TODO: Superuser might need to be able to modify other users' info.
*/
userRouter.put(
  '/',
  middleware.tokenExtractor,
  updateUser,
  middleware.userUpdater
);

module.exports = userRouter;
