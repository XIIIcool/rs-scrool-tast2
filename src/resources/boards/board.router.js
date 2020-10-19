const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const Task = require('./../tasks/task.model');
const tasksService = require('./../tasks/task.service');

// BOARDS

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(boards.map(Board.toResponse));
});

router.route('/:id').get(async (req, res) => {
  try {
    const board = await boardsService.get(req.params.id);
    res.status(200).send(Board.toResponse(board));
  } catch (e) {
    res.status(e.status).send({ message: e.message });
  }

});

router.route('/:id').delete(async (req, res) => {
  try {
    await boardsService.remove(req.params.id);
    res.sendStatus(200);
  } catch (e) {
    res.status(e.status).send({ message: e.message });
  }

});

router.route('/').post(async (req, res) => {
  try {
    const board = await boardsService.save(Board.fromRequest(req.body));
    res.status(200).send(Board.toResponse(board));
  } catch (e) {
    res.status(e.status).send({ message: e.message });
  }
});

router.route('/:id').put(async (req, res) => {
  try {
    const body = req.body;
    body.id = req.params.id;
    const board = await boardsService.update(
      req.params.id,
      Board.fromRequest(body)
    );

    res.status(200).send(Board.toResponse(board));
  } catch (e) {
    res.status(e.status).send({ message: e.message });
  }
});

// BOARDS


// TASKS

router.route('/:boardId/tasks').get(async (req, res) => {
  try {
    const tasks = await tasksService.getTaskByBoard(req.params.boardId);
    res.json(tasks.map(Task.toResponse));
  } catch (e) {
    res.status(e.status).send({ message: e.message });
  }
});

router.route('/:boardId/tasks').post(async (req, res) => {
  try {
    const body = req.body;
    body.boardId = req.params.boardId;
    const task = await tasksService.save(Task.fromRequest(body));
    res.status(200).send(Task.toResponse(task));
  } catch (e) {
    res.status(e.status).send({ message: e.message });
  }
});

router.route('/:boardId/tasks/:taskId').get(async (req, res) => {

  try {

    const task = await tasksService.getTaskByBoardAndTask(
      req.params.boardId,
      req.params.taskId
    );
    res.json(Task.toResponse(task));

  } catch (e) {

    console.log(e);

    res.status(e.status).send({ message: e.message });
  }

});

router.route('/:boardId/tasks/:taskId').put(async (req, res) => {
  try {
    const body = req.body;
    body.id = req.params.taskId;
    body.boardId = req.params.boardId;
    const task = await tasksService.update(
      req.params.taskId,
      req.params.boardId,
      Task.fromRequest(body)
    );

    res.status(200).send(Task.toResponse(task));
  } catch (e) {
    res.status(e.status).send({ message: e.message });
  }
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res) => {
  try {
    const task = await tasksService.remove(req.params.taskId, req.params.boardId);
    res.sendStatus(200);
  } catch (e) {
    // console.log(e);
    res.status(e.status).send({ message: e.message });
  }

});

// TASKS

module.exports = router;
