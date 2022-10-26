const { validationResult } = require('express-validator');
const Post = require('../models/post');
const Comment = require('../models/comment');

const createPost = async (req, res) => {
  const { title, experience, description, domain, workHours, workPlace } =
    req.body;
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    res.status(400).send({ errors: validationErrors.array() });
  }
  try {
    let post = new Post({
      title,
      user: req.user.id,
      description,
      domain,
      workHours,
      experience,
      workPlace,
    });
    await post.save();
    const id = post.id;
    Post.findById(id)
      .populate('user')
      .then((post) => {
        res.json(post);
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: 'Error posting!' });
  }
};

const getPosts = async (req, res, next) => {
  req.model = Post;
  req.populate = [
    { path: 'user' },
    { path: 'comments', populate: { path: 'user' } },
  ];
  next();
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate([
      { path: 'user' },
      { path: 'comments', populate: { path: 'user' } },
    ]);
    res.json(post);
  } catch (error) {
    res.status(404).json({ msg: 'no such post found' });
  }
};

const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(404).json({ msg: 'cant delete post' });
  }
};

const manageComment = async (req, res) => {
  try {
    const action = req.header('action');
    let comment = null;
    let post = null;
    let user,
      body,
      id = null;
    switch (action) {
      case 'add':
        user = req.body.user;
        body = req.body.body;
        comment = new Comment({ user, body });
        await comment.save();
        post = await Post.findOneAndUpdate(
          { _id: req.params.id },
          { $push: { comments: comment.id } },
          { new: true }
        ).populate([
          { path: 'user' },
          {
            path: 'comments',
            populate: { path: 'user' },
          },
        ]);
        break;
      case 'delete':
        id = req.body.id;

        await Comment.findByIdAndRemove(id);
        post = await Post.findOneAndUpdate(
          { _id: req.params.id },
          { $pull: { comments: id } },
          { new: true }
        ).populate([
          { path: 'user' },
          {
            path: 'comments',
            populate: { path: 'user' },
          },
        ]);
        break;
      case 'modify':
        id = req.body.id;
        user = req.body.user;
        body = req.body.body;

        await Comment.findByIdAndUpdate(id, {
          user: user,
          body: body,
          updated: req.body.updated,
        });
        post = await Post.findById(req.params.id).populate([
          { path: 'user' },
          {
            path: 'comments',
            populate: { path: 'user' },
          },
        ]);
        break;
    }
    res.json(post);
  } catch (error) {
    res.status(404).json({ msg: 'post or comment not found' });
  }
};

module.exports = { createPost, getPosts, getPost, manageComment, deletePost };
