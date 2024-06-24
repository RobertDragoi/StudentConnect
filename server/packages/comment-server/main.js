const express = require('express');
const cors = require('cors');
const config = require('./utils/config');
const mongoose = require('mongoose');

const logger = require('./utils/logger');
const app = express();
app.use(cors());
mongoose
  .connect(config.COMMENT_MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  })
  .then(() => logger.info('Connected to MongoDB from comment-server'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use('/public', express.static('public'));
app.use('/api/comment', require('./routes'));
app.listen(config.PORT, () => {
  logger.info(`Comment server running on port ${config.PORT}`);
});
