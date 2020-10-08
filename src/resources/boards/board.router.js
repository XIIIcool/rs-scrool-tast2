const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const Task = require('./../tasks/task.model');
const tasksService = require('./../tasks/task.service');

// TASKS

router.route('/:boardId/tasks').get(async (req, res) => {
  const tasks = await tasksService.getTaskByBoard(req.params.boardId);
  res.json(tasks.map(Task.toResponse));
});

router.route('/:boardId/tasks').post(async (req, res) => {
  const body = req.body;
  body.boardId = req.params.boardId;
  const task = await tasksService.save(Task.fromRequest(body));
  res.status(200).send(Task.toResponse(task));
});

router.route('/:boardId/tasks/:taskId').get(async (req, res) => {
  const tasks = await tasksService.getTaskByBoardAndTask(
    req.params.boardId,
    req.params.taskId
  );
  res.json(tasks.map(Task.toResponse));
});

router.route('/:boardId/tasks/:taskId').put(async (req, res) => {
  const body = req.body;
  body.id = req.params.taskId;
  body.boardId = req.params.boardId;
  const task = await tasksService.update(
    req.params.taskId,
    req.params.boardId,
    Task.fromRequest(body)
  );

  res.status(200).send(Task.toResponse(task));
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res) => {
  // const task = await tasksService.remove(req.params.taskId, req.params.boardId);

  res.sendStatus(200);
});

// TASKS

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(boards.map(Board.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const board = await boardsService.get(req.params.id);
  res.status(200).send(Board.toResponse(board));
});

router.route('/:id').delete(async (req, res) => {
  await boardsService.remove(req.params.id);
  res.sendStatus(200);
});

router.route('/').post(async (req, res) => {
  const board = await boardsService.save(Board.fromRequest(req.body));
  res.status(200).send(Board.toResponse(board));
});

router.route('/:id').put(async (req, res) => {
  const body = req.body;
  body.id = req.params.id;
  const board = await boardsService.update(
    req.params.id,
    Board.fromRequest(body)
  );

  res.status(200).send(Board.toResponse(board));
});

module.exports = router;
