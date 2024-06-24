const config = require('./config');
const logger = require('./logger');
const jwt = require('jsonwebtoken');

const tokenExtractor = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    res.status(401).json({ error: 'no token provided' });
  }

  const decodedToken = jwt.verify(token, config.JWT_SECRET);
  req.user = decodedToken.user;

  next();
};

/*
 * Adds a request.limit that specifies the limit of elements on a given page (default 100)
 */
const limitExtractor = async (req, res, next) => {
  logger.info(req.query);
  if (req.query.limit) req.limit = parseInt(req.query.limit);
  else req.limit = 100;
  next();
};

/*
 * Adds a request.page that specifies the page to use (default 1)
 */
const pageExtractor = async (req, res, next) => {
  if (req.query.page) req.page = parseInt(req.query.page);
  else req.page = 1;
  next();
};

/*
 * Adds a request.sort field to a request that specifies what parameters to sort by
 */
const sortingExtractor = async (req, res, next) => {
  if (req.query.sort_by) req.sort = req.query.sort_by;
  next();
};

/*
 * Adds a request.filter field to a request that specifies the filters that are to be applied
 */
const filterExtractor = async (req, res, next) => {
  req.filter = {};
  for (let field in req.query) {
    if (!['limit', 'sort_by', 'page', 'fuzzy'].includes(field))
      req.filter[field] = req.query[field];
  }
  next();
};

const fuzzySearchExtractor = async (req, res, next) => {
  req.fuzzy = req.query.fuzzy;
  next();
};

/*
 * Assuming that a req.model with the given model class and optionally a req.populate has been saved in previous functions
 * this function applies provided filters, sorting and pagination on the given model and returns
 * it as JSON or errors out
 */
const modelResolver = async (req, res) => {
  try {
    let query;
    if (req.fuzzy) {
      query = req.model.fuzzySearch({ query: req.fuzzy, minSize: 4 });
    } else {
      query = req.model.find(req.filter);
    }
    query
      .populate(req.populate)
      .sort(req.sort)
      .limit(req.limit)
      .skip(req.limit * (req.page - 1));
    const requestedData = await query.exec();
    res.json(requestedData);
  } catch (e) {
    res.status(400).send({
      error: 'bad request',
    });
  }
};

module.exports = {
  tokenExtractor,
  pageExtractor,
  limitExtractor,
  sortingExtractor,
  filterExtractor,
  modelResolver,
  fuzzySearchExtractor,
};
