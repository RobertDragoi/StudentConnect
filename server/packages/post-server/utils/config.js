/* eslint-disable no-undef */
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;
const USER_MONGODB_URI = process.env.USER_MONGODB_URI;
const POST_MONGODB_URI = process.env.POST_MONGODB_URI;
module.exports = {
  PORT,
  USER_MONGODB_URI,
  POST_MONGODB_URI,
  JWT_SECRET,
};
