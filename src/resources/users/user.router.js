const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  try {
    const user = await usersService.get(req.params.id);
    res.status(200).send(User.toResponse(user));
  } catch (e) {
    res.status(e.status).send({ message: e.message });
  }

});

router.route('/:id').delete(async (req, res) => {
  try {
    await usersService.remove(req.params.id);
    res.sendStatus(200);
  } catch (e) {
    res.status(e.status).send({ message: e.message });
  }
});

router.route('/').post(async (req, res) => {
  try {
    const user = await usersService.save(User.fromRequest(req.body));
    res.status(200).send(User.toResponse(user));
  } catch (e) {
    res.status(e.status).send({ message: e.message });
  }
});

router.route('/:id').put(async (req, res) => {
  try {
    const body = req.body;
    body.id = req.params.id;
    const user = await usersService.update(req.params.id, User.fromRequest(body));

    res.status(200).send(User.toResponse(user));
  } catch (e) {
    res.status(e.status).send({ message: e.message });
  }
});

module.exports = router;
