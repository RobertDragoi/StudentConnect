const { validationResult } = require('express-validator');
const axios = require('axios');
const Post = require('./models/post');

const createPost = async (req, res) => {
  const { title, experience, description, domain, workHours, workPlace } =
    req.body;
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    res.status(400).send({ errors: validationErrors.array() });
  }
  try {
    const user = await axios.get(
      `http://user-server:4003/api/user/${req.user.id}`
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
    res.status(200).end();
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
    const comments = await axios.post(
      'http://comment-server:4004/api/comment/get',
      {
        commentIds: post.comments,
      }
    );
    res.json({ ...post._doc, comments: comments.data });
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    await Post.findByIdAndRemove(req.params.id);
    await axios.post('http://comment-server:4004/api/comment/delete', {
      commentIds: post.comments,
    });

    res.status(204).end();
  } catch (error) {
    res.status(404).send({ msg: 'Cannot delete post' });
  }
};

const manageComment = async (req, res) => {
  try {
    const action = req.header('action');
    let body, comment, id;
    switch (action) {
      case 'add':
        body = req.body.body;
        comment = await axios.post('http://comment-server:4004/api/comment', {
          id: req.user.id,
          body,
        });
        await Post.findOneAndUpdate(
          { _id: req.params.id },
          { $push: { comments: comment.data.id } },
          { new: true }
        );
        break;
      case 'delete':
        id = req.body.id;
        await axios.delete(`http://comment-server:4004/api/comment/${id}`);
        await Post.findOneAndUpdate(
          { _id: req.params.id },
          { $pull: { comments: id } },
          { new: true }
        );
        break;
      case 'modify':
        id = req.body.id;
        body = req.body.body;
        await axios.put(`http://comment-server:4004/api/comment/${id}`, {
          id,
          body,
        });
        break;
    }
    res.status(200).end();
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
