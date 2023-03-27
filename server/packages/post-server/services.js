const { validationResult } = require('express-validator');
const Post = require('./models/post');
const Comment = require('./models/comment');
const axios = require('axios');
const createPost = async (req, res) => {
  const { title, experience, description, domain, workHours, workPlace } =
    req.body;
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    res.status(400).send({ errors: validationErrors.array() });
  }
  try {
    const user = await axios.get(
      `http://localhost:4003/api/user/${req.user.id}`
    );
    let post = new Post({
      title,
      user: user.data,
      description,
      domain,
      workHours,
      experience,
      workPlace,
    });
    await post.save();
    res.send({ status: 200 });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getPosts = async (req, res, next) => {
  req.model = Post;
  next();
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comments = await Comment.find({ _id: { $in: post.comments } });
    res.json({ ...post._doc, comments: comments });
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    await Post.findByIdAndRemove(req.params.id);
    console.log(post);
    await Comment.deleteMany({ _id: { $in: post.comments } });

    res.status(204).end();
  } catch (error) {
    res.status(404).send({ msg: 'Cannot delete post' });
  }
};

const manageComment = async (req, res) => {
  try {
    const action = req.header('action');
    let comment = null;
    let user,
      body,
      id = null;
    switch (action) {
      case 'add':
        user = await axios.get(`http://localhost:4003/api/user/${req.user.id}`);
        body = req.body.body;
        comment = new Comment({ user: user.data, body });
        await comment.save();
        await Post.findOneAndUpdate(
          { _id: req.params.id },
          { $push: { comments: comment.id } },
          { new: true }
        );
        break;
      case 'delete':
        id = req.body.id;
        await Comment.findByIdAndRemove(id);
        await Post.findOneAndUpdate(
          { _id: req.params.id },
          { $pull: { comments: id } },
          { new: true }
        );
        break;
      case 'modify':
        id = req.body.id;
        body = req.body.body;
        await Comment.findByIdAndUpdate(id, {
          body: body,
          updated: req.body.updated,
        });
        break;
    }
    res.send({ status: 200 });
  } catch (error) {
    res.status(404).send({ msg: 'Post or comment not found' });
  }
};

module.exports = {
  createPost,
  getPosts,
  getPost,
  manageComment,
  deletePost,
};
