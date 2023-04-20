const commentRouter = require('express').Router();
const { check } = require('express-validator');
const middleware = require('./utils/middleware');
const {
  createComment,
  getComments,
  deleteComment,
  deleteComments,
  updateComment,
} = require('./services');
commentRouter.post(
  '/',
  check('body').not().isEmpty(),
  middleware.tokenExtractor,
  createComment
);
commentRouter.post('/get', getComments);
commentRouter.post('/delete', middleware.tokenExtractor, deleteComments);
commentRouter.put('/:id', middleware.tokenExtractor, updateComment);
commentRouter.delete('/:id', middleware.tokenExtractor, deleteComment);
module.exports = commentRouter;
