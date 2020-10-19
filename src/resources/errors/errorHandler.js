const notFoundError = require('./NotFoundError');
const Winston = require('../../utils/Logger');

const handle = (err, req, res, next) => {
  if (err instanceof notFoundError) {
    Winston.logger.error(`request error: code: ${err.status} message: ${err.message}`, err);
    res.status(err.status).send(err.message);
  } else if (err) {
    res.sendStatus(500);
    Winston.logger.error(`request error: code: ${err.status} message: ${err.message}`, err);
  }
  next();
};

module.exports = {
  handle
};
