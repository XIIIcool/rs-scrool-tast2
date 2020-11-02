// const DB = require('../../utils/inMemoryDb');
const DB = require('../../utils/MongoDb');
const NOT_FOUND_ERROR = require('../errors/NotFoundError');
const TABLE_NAME = 'Tasks';

const deleteManyTaskByFind = async (find) => {
  return await DB.deleteManyEntity(TABLE_NAME, find);
}

const updateManyTasks = async (userId) => {
  return await DB.updateManyEntity(TABLE_NAME, {
    userId: userId
  }, { userId: null });
};

const getTasksWhereUserId = async (userId) => {
  return await DB.getAllEntities(TABLE_NAME, {
    userId: userId
  });
};

const getTaskByBoard = async boardId => {
  const tasks = await DB.getAllEntities(TABLE_NAME, {
    boardId: boardId
  });

  if (!tasks) {
    throw new NOT_FOUND_ERROR(
      `Couldn\`t find a task where board id: ${boardId}`
    );
  }

  return tasks;
};

const getTaskByBoardAndTask = async (boardId, taskId) => {
  const task = await DB.getAllEntities(TABLE_NAME, {
    boardId: boardId,
    id: taskId
  });

  if (!task || task.length === 0) {
    throw new NOT_FOUND_ERROR(`Couldn\`t find a task with id: ${taskId} and board id: ${boardId}`);
  }

  return task[0];
};

const remove = async taskId => {
  if (!(await DB.removeEntity(TABLE_NAME, taskId))) {
    throw new NOT_FOUND_ERROR(`Couldn\`t find a task with id: ${taskId}`);
  }
};

const save = async user => {
  return DB.saveEntity(TABLE_NAME, user);
};

const update = async (taskId, boardId = '', task) => {
  const entity = await DB.updateEntity(TABLE_NAME, taskId, task);

  if (!entity) {
    throw new NOT_FOUND_ERROR(
      `Couldn't find a task ${taskId} where boardId: ${boardId}`
    );
  }

  return entity;
};

module.exports = {
  remove,
  save,
  update,
  getTaskByBoardAndTask,
  getTaskByBoard,
  getTasksWhereUserId,
  updateManyTasks,
  deleteManyTaskByFind
};
