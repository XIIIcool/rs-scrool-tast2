const Winston = require('../../utils/Logger');

module.exports = {

  /**
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<void>}
   */
  init: async function (req, res, next) {

    Winston.logger.info(`Express request`, {
      method: req.method,
      url: req.originalUrl,
      params: req.params,
      query: req.query,
      body: req.body
    });

    next();
  }
}
