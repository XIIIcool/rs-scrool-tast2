class NOT_FOUND_ERROR extends Error {

  constructor(message) {
    super();
    this.message = message;
    this.name = 'NotFoundError';
    this.status = 404;
  }

}

module.exports = NOT_FOUND_ERROR;
