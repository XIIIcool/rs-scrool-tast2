const notFoundError = require('./NotFoundError');
const forbiddenError = require('./ForbiddenError');
const unauthorizedError = require('./UnauthorizedError');
const Winston = require('../../utils/Logger');

const handle = (err, req, res, next) => {
  if (err instanceof notFoundError) {
    Winston.logger.error(`request error: code: ${err.status} message: ${err.message}`);
    res.status(err.status).send(err.message);
    return false;
  }
  if (err instanceof forbiddenError) {
    Winston.logger.error(`request error: code: ${err.status} message: ${err.message}`);
    res.status(err.status).send(err.message);
    return false;
  }
  if (err instanceof unauthorizedError) {
    Winston.logger.error(`request error: code: ${err.status} message: ${err.message}`);
    res.status(err.status).send(err.message);
    return false;
  } else if (err) {
    res.sendStatus(500);
    Winston.logger.error(`request error: code: ${err.status} message: ${err.message}`, err);
  }
  next();
};

module.exports = {
  handle
};
