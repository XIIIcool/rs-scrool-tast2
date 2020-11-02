class ForbiddenError extends Error {

  constructor(message) {
    super();
    this.message = message;
    this.name = 'ForbiddenError';
    this.status = 403;
  }

}

module.exports = ForbiddenError;
