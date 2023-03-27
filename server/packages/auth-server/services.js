const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const config = require('./utils/config');
const User = require('./models/user');
const Student = require('./models/student');
const Company = require('./models/company');

const loadUser = async (req, res) => {
  try {
    let user = await User.findById(req.user.id);
    res.json(user);
  } catch {
    res.status(500).json({ msg: 'Cannot find user' });
  }
};
const loginUser = async (req, res) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(400).json({ errors: validationErrors.array() });
  }

  const { email, password } = req.body;
  let user = await User.findOne({ email });

  if (user) {
    const passwordCorrect = await bcrypt.compare(password, user.password);

    if (!passwordCorrect) {
      return res.status(400).json({ msg: 'Invalid password!' });
    }

    const payload = { user: { id: user.id } };
    const authToken = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign(
      { ...payload, date: new Date() },
      config.JWT_SECRET,
      { expiresIn: '30d' }
    );
    res.json({ authToken, refreshToken });
  } else {
    return res.status(400).json({ msg: 'Invalid email!' });
  }
};
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
    const { birthDate, education, creationDate, activityDomain } = req.body;
    let user;
    switch (type) {
      case 'student':
        user = new Student({
          name,
          email,
          password: hashedPassword,
          address,
          description,
          student: { birthDate, education },
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
          company: { creationDate, activityDomain },
        });
        await user.save();
        break;
    }
    const payload = { user: { id: user.id } };
    const authToken = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign(
      { ...payload, date: new Date() },
      config.JWT_SECRET,
      { expiresIn: '30d' }
    );
    res.json({ authToken, refreshToken });
  } catch (error) {
    res.status(400).json({ msg: 'An account with this email already exists' });
  }
};

const refreshToken = async (req, res) => {
  try {
    const token = req.header('Authorization');
    const decoded = jwt.verify(token, config.JWT_SECRET);
    const payload = {
      user: {
        id: decoded.user.id,
      },
    };
    const authToken = await jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: 360000,
    });
    res.json({ authToken });
  } catch (error) {
    res.status(400).json({ msg: 'Cannot refresh auth-token' });
  }
};

module.exports = { loadUser, loginUser, registerUser, refreshToken };
