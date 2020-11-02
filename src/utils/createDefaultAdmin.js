const userService = require('../resources/users/user.service');
const userModel = require('../resources/users/user.model');

module.exports = (async () => {
  await userService.save(new userModel({
    name: 'admin',
    login: 'admin',
    password: 'admin'
  }))
});

