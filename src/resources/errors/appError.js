class NOT_FOUND_ERROR extends Error {

  constructor(message) {
    super();
    this.message = message;
    this.name = 'NotFoundError';
  }

}

module.exports = NOT_FOUND_ERROR;
