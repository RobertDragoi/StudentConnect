const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const config = require('./utils/config');
const app = express();
app.use(cors());

mongoose
  .connect(config.USER_MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  })
  .then(() => logger.info('Connected to MongoDB from auth-server'));
app.use(express.json());
app.use('/public', express.static('public'));
app.use('/api/auth', require('./routes'));
app.listen(config.PORT, () => {
  logger.info(`Auth server running on port ${config.PORT}`);
});
