const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const config = require('../utils/config');
const logger = require('../utils/logger');
const User = require('../models/user');
const Student = require('../models/student');
const Company = require('../models/company');

const registerUser = async (req, res) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(400).json({ errors: validationErrors.array() });
  }

  try {
    let { type, name, email, password, address, description } = req.body;
    type = type.toLowerCase();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const { birthDate, school, creationDate, activity } = req.body;
    let user;
    switch (type) {
      case 'student':
        user = new Student({
          name,
          email,
          password: hashedPassword,
          address,
          description,
          student: { birthDate, school },
        });
        await user.save();
        break;
      case 'company':
        user = new Company({
          name,
          email,
          password: hashedPassword,
          address,
          description,
          company: { creationDate, activity },
        });
        await user.save();
        break;
    }
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token: token });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ msg: 'An account with this email already exists' });
  }
};

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
    logger.error(error.message);
    response.status(500).json({ msg: 'No such user found!' });
  }
};

const updateUser = async (request, response, next) => {
  const requestId = request.params.id;
  const requesterId = request.user.id;
  if (requestId !== requesterId)
    response.status(401).json({ msg: 'only make changes to your own user!' });
  next();
};
module.exports = { getUsers, getUser, registerUser, updateUser };
