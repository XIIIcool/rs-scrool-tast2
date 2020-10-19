const notFoundError = require('./NotFoundError');

const handle = (err, req, res, next) => {
  console.log(req);
  if (err instanceof notFoundError) {
    res.status(err.status).send(err.message);
  } else if (err) {
    res.sendStatus(588);
  }
  next();
};

module.exports = {
  handle
};
