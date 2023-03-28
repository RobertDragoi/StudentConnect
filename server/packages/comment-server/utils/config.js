/* eslint-disable no-undef */
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;
const COMMENT_MONGODB_URI = process.env.COMMENT_MONGODB_URI;

module.exports = {
  PORT,
  JWT_SECRET,
  COMMENT_MONGODB_URI,
};
