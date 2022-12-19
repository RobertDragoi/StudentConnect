const User = require('../models/user');

const getUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};

const getUser = async (request, response) => {
  const id = request.params.id;

  try {
    const searchedUser = await User.findById(id);
    response.json(searchedUser);
  } catch (error) {
    response.status(500).json({ msg: 'No such user found!' });
  }
};

const updateUser = async (req, res, next) => {
  const requestId = req.query?.id || null;
  const requesterId = req.user.id;
  if (requestId && requestId !== requesterId)
    res.status(401).json({ msg: 'only make changes to your own user!' });
  next();
};
module.exports = { getUsers, getUser, updateUser };
