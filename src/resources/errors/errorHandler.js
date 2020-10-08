const notFoundError = require('./appError');

const handle = (err, req, res, next) => {
  if (err instanceof notFoundError) {
    res.status(err.status).send(err.message);
  } else if (err) {
    res.sendStatus(588);
  }
  next();
};

module.exports = handle;
