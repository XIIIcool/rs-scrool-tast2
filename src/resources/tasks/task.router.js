const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/:id').delete(async (req, res) => {
  try {
    await tasksService.remove(req.params.id);
    res.sendStatus(200);
  } catch (e) {
    res.status(e.status).send({ message: e.message });
  }
});

router.route('/:id').put(async (req, res) => {
  try {
    const body = req.body;
    body.id = req.params.id;
    const task = await tasksService.update(req.params.id, Task.fromRequest(body));

    res.status(200).send(Task.toResponse(task));
  } catch (e) {
    res.status(e.status).send({ message: e.message });
  }
});

module.exports = router;
