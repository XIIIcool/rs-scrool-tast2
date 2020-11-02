const router = require('express').Router();
const usersModel = require('./../users/user.model');
const usersService = require('./../users/user.service');
const handleRoute = require('../errors/handleRoute');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');

router.route('/').post(

  handleRoute(async (req, res) => {

    const body = req.body;

    let resultFind = await usersService.findUser({
      login: body.login
    });

    if (bcrypt.compareSync(body.password, resultFind.password)) {

      const token = jwt.sign({ id: resultFind.id, login: resultFind.login }, JWT_SECRET_KEY, { expiresIn: '1h' });
      res.json({token: token });
    } else {
      res.json({ status: 'error', message: 'Invalid email/password!!!', data: null });
    }

  })

);


module.exports = router;
