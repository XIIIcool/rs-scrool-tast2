const uuid = require('uuid');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class User {
  constructor({
                id = uuid(),
                name = 'USER',
                login = 'user',
                password = 'P@55w0rd'
              } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    let resPas = bcrypt.hashSync(password, saltRounds)
    //console.log('create', password, resPas);
    this.password = bcrypt.hashSync(password, saltRounds);

  }

  /**
   *
   * @param user
   * @returns {{name: *, id: *, login: *}}
   */
  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }

  /**
   *
   * @param body
   * @returns {User}
   */
  static fromRequest(body) {
    return new User(body);
  }

}

module.exports = User;
