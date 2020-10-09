const DB = require('../../utils/inMemoryDb');
const NOT_FOUND_ERROR = require('../../resources/errors/appError');
const TABLE_NAME = 'Tasks';

const getTaskByBoard = async boardId => {
  const tasks = await DB.getAllEntities(TABLE_NAME).filter(
    task => task.boardId === boardId
  );

  if (!tasks) {
    throw new NOT_FOUND_ERROR(
      `Couldn\`t find a task where board id: ${boardId}`
    );
  }

  return tasks;
};

const getTaskByBoardAndTask = async (boardId, taskId) => {
  const task = await DB.getAllEntities(TABLE_NAME, taskId).filter(
    tasks => tasks.id === taskId && tasks.boardId === boardId
  );

  if (!task) {
    throw new NOT_FOUND_ERROR(`Couldn\`t find a task with id: ${taskId}`);
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

const update = async (taskId, boardId, task) => {
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
  getTaskByBoard
};
