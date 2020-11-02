const forbiddenError = require('../errors/ForbiddenError');
const unauthorizedError = require('../errors/UnauthorizedError');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');
const userService = require('../../resources/users/user.service');

module.exports = async (req, res, next) => {

  const bearerHeader = req.headers['authorization'];

  if (bearerHeader) {
    const bearer = bearerHeader.split(' ');
    req.token = bearer[1];

    jwt.verify(req.token, JWT_SECRET_KEY, async function(err, decoder) {
      if(err) next(new unauthorizedError('wrong token'));

      try {
        let user = await userService.findUser({
          id: decoder.id,
          login: decoder.login
        });

        next();

      } catch (e) {
        next(new forbiddenError('non auth'));
      }

    });


  } else {
    next(new unauthorizedError('not found token'));
  }

};
