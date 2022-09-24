const postsRouter = require("express").Router();
const { check } = require("express-validator");
const middleware = require("../utils/middleware");
const {
  createPost,
  getPosts,
  getPost,
  manageComment,
  deletePost,
} = require("../services/posts");
postsRouter.post(
  "/",
  middleware.tokenExtractor,
  check("title").not().isEmpty(),
  check("programmingLang").not().isEmpty(),
  check("workPlace").not().isEmpty(),
  createPost
);

postsRouter.get(
  "/",
  middleware.limitExtractor,
  middleware.pageExtractor,
  middleware.filterExtractor,
  middleware.sortingExtractor,
  middleware.fuzzySearchExtractor,
  getPosts,
  middleware.modelResolver
);

postsRouter.get("/:id", getPost);
postsRouter.put("/:id/comment", manageComment);
postsRouter.delete("/:id", deletePost);

module.exports = postsRouter;
