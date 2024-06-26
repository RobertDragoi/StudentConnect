const postsRouter = require('express').Router();
const { check } = require('express-validator');
const middleware = require('./utils/middleware');
const {
  createPost,
  getPosts,
  getPost,
  manageComment,
  deletePost,
} = require('./services');
postsRouter.post(
  '/',
  middleware.tokenExtractor,
  check('title').not().isEmpty(),
  check('domain').not().isEmpty(),
  check('workPlace').not().isEmpty(),
  createPost
);

postsRouter.get(
  '/',
  middleware.limitExtractor,
  middleware.pageExtractor,
  middleware.filterExtractor,
  middleware.sortingExtractor,
  middleware.fuzzySearchExtractor,
  getPosts,
  middleware.modelResolver
);

postsRouter.get('/:id', getPost);
postsRouter.put('/:id/comment', middleware.tokenExtractor, manageComment);
postsRouter.delete('/:id', middleware.tokenExtractor, deletePost);

module.exports = postsRouter;
