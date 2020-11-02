const usersRepo = require('./board.memory.repository');
const User = require('./board.model');
const TaskRepo = require('../tasks/task.memory.repository');

const getAll = () => usersRepo.getAll();

const get = id => usersRepo.get(id);

const remove = id => usersRepo.remove(id).then(async () => {
  //When somebody DELETE Board, all its Tasks should be deleted as well.

  return await TaskRepo.deleteManyTaskByFind({
    boardId: id
  })

});

const save = user => {
  return usersRepo.save(new User(user));
};

const update = (id, user) => usersRepo.update(id, user);

module.exports = { getAll, get, remove, save, update };
