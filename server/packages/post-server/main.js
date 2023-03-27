const express = require('express');
const cors = require('cors');
const config = require('./utils/config');
const mongoose = require('mongoose');

const fileUpload = require('express-fileupload');
const logger = require('./utils/logger');
const app = express();
app.use(cors());
app.use(
  fileUpload({
    createParentPath: true,
    safeFileName: true,
    useTempFiles: true,
    tempFileDir: 'tmp/',
    parseNested: true,
  })
);
mongoose
  .connect(config.POST_MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  })
  .then(() => logger.info('Connected to MongoDB from post-server'));
app.use(express.json());
app.use('/public', express.static('public'));
app.use('/api/post', require('./routes'));
app.listen(config.PORT, () => {
  logger.info(`Post server running on port ${config.PORT}`);
});
