const { validationResult } = require('express-validator');
const axios = require('axios');
const Comment = require('./models/comment');

const createComment = async (req, res) => {
  const body = req.body.body;
  const id = req.body.id;
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    res.status(400).send({ errors: validationErrors.array() });
  }
  try {
    const user = await axios.get(`http://user-server:4003/api/user/${id}`);
    const comment = new Comment({ user: user.data, body });
    await comment.save();
    res.json(comment);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getComments = async (req, res) => {
  try {
    const { commentIds } = req.body;
    const comments = await Comment.find({ _id: { $in: commentIds } });
    res.json(comments);
  } catch (error) {
    res.status(404).send('Cannot get comments');
  }
};

const deleteComments = async (req, res) => {
  try {
    const { commentIds } = req.body;
    await Comment.deleteMany({ _id: { $in: commentIds } });
    res.status(204).end();
  } catch (error) {
    res.status(404).send({ msg: 'Cannot delete comments' });
  }
};
const deleteComment = async (req, res) => {
  try {
    await Comment.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(404).send({ msg: 'Cannot delete comment' });
  }
};
const updateComment = async (req, res) => {
  try {
    const { id, body } = req.body;
    await Comment.findByIdAndUpdate(id, {
      body: body,
      updated: req.body.updated,
    });
  } catch (error) {
    res.status(404).send({ msg: 'Comment cannot be updated' });
  }
};

module.exports = {
  createComment,
  getComments,
  deleteComment,
  deleteComments,
  updateComment,
};
