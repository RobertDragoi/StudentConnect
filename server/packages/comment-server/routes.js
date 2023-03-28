const commentRouter = require('express').Router();
const { check } = require('express-validator');
//const middleware = require('./utils/middleware');
const {
  createComment,
  getComments,
  deleteComment,
  deleteComments,
  updateComment,
} = require('./services');
commentRouter.post('/', check('body').not().isEmpty(), createComment);
commentRouter.post('/get', getComments);
commentRouter.post('/delete', deleteComments);
commentRouter.put('/:id', updateComment);
commentRouter.delete('/:id', deleteComment);
module.exports = commentRouter;
