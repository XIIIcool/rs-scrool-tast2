const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/:id').delete(async (req, res) => {
  await tasksService.remove(req.params.id);
  res.sendStatus(200);
});

router.route('/:id').put(async (req, res) => {
  const body = req.body;
  body.id = req.params.id;
  const task = await tasksService.update(req.params.id, Task.fromRequest(body));

  res.status(200).send(Task.toResponse(task));
});

module.exports = router;
