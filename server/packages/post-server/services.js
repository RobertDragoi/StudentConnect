const { validationResult } = require('express-validator');
const axios = require('axios');
const Post = require('./models/post');
const { COMMENT_SERVER, USER_SERVER } = require('./utils/config');
const createPost = async (req, res) => {
  const { title, experience, description, domain, workHours, workPlace } =
    req.body;
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    res.status(400).send({ errors: validationErrors.array() });
  }
  try {
    const user = await axios.get(`${USER_SERVER}/api/user/${req.user.id}`, {
      headers: {
        Authorization: req.header('Authorization'),
      },
    });
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
    res.status(500).send({ msg: error.message });
  }
};

const getPosts = async (req, res, next) => {
  req.model = Post;
  next();
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comments = await axios.post(`${COMMENT_SERVER}/api/comment/get`, {
      commentIds: post.comments,
    });
    res.json({ ...post._doc, comments: comments.data });
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    await Post.findByIdAndRemove(req.params.id);
    await axios.post(
      '${COMMENT_SERVER}/api/comment/delete',
      {
        commentIds: post.comments,
      },
      {
        headers: {
          Authorization: req.header('Authorization'),
        },
      }
    );

    res.status(204).end();
  } catch (error) {
    res.status(404).send({ msg: 'Cannot delete post' });
  }
};

const manageComment = async (req, res) => {
  try {
    const config = {
      headers: {
        Authorization: req.header('Authorization'),
      },
    };
    const action = req.header('action');
    let body, comment, id;
    switch (action) {
      case 'add':
        body = req.body.body;
        comment = await axios.post(
          `${COMMENT_SERVER}/api/comment`,
          {
            body,
          },
          config
        );
        await Post.findOneAndUpdate(
          { _id: req.params.id },
          { $push: { comments: comment.data.id } },
          { new: true }
        );
        break;
      case 'delete':
        id = req.body.id;
        await axios.delete(`${COMMENT_SERVER}/api/comment/${id}`, config);
        await Post.findOneAndUpdate(
          { _id: req.params.id },
          { $pull: { comments: id } },
          { new: true }
        );
        break;
      case 'modify':
        id = req.body.id;
        body = req.body.body;
        await axios.put(
          `${COMMENT_SERVER}/api/comment/${id}`,
          {
            id,
            body,
          },
          config
        );
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
