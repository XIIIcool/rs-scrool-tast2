const tasksRepo = require('./task.memory.repository');
const Task = require('./task.model');

const getTaskByBoard = boardId => tasksRepo.getTaskByBoard(boardId);

const getTaskByBoardAndTask = (boardId, taskId) =>
  tasksRepo.getTaskByBoardAndTask(boardId, taskId);

const remove = (taskId, boardId) => tasksRepo.remove(taskId, boardId);

const save = task => {
  return tasksRepo.save(new Task(task));
};

const update = (taskId, boardId, task) =>
  tasksRepo.update(taskId, boardId, task);

module.exports = {
  remove,
  save,
  update,
  getTaskByBoardAndTask,
  getTaskByBoard
};
