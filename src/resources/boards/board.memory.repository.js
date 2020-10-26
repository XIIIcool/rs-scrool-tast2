// const DB = require('../../utils/inMemoryDb');
const DB = require('../../utils/MongoDb');
const NOT_FOUND_ERROR = require('../errors/NotFoundError');
const TABLE_NAME = 'Boards';

const getAll = async () => {
  return await DB.getAllEntities(TABLE_NAME);
};

const get = async id => {
  const user = await DB.getEntity(TABLE_NAME, id);

  if (!user) {
    throw new NOT_FOUND_ERROR(`Couldn\`t find a board with id: ${id}`);
  }

  return user;
};

const remove = async id => {
  if (!(await DB.removeEntity(TABLE_NAME, id))) {
    throw new NOT_FOUND_ERROR(`Couldn\`t find a board with id: ${id}`);
  }
};

const save = async user => {
  return DB.saveEntity(TABLE_NAME, user);
};

const update = async (id, user) => {

  const entity = await DB.updateEntity(TABLE_NAME, id, user);

  if (!entity) {
    throw new NOT_FOUND_ERROR(`Couldn\`t find a board with id: ${id}`);
  }

  return entity;
};

module.exports = { getAll, get, remove, save, update };
