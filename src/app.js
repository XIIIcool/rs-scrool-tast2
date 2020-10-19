const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardsRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const Winston = require('./utils/Logger');
const RequestMiddlewareLog = require('./resources/middlewares/RequestLog');
const createError = require('http-errors');
const errorHandler = require('./resources/errors/errorHandler');
const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// запись всех request запросов
app.use(RequestMiddlewareLog.init);

app.use('/', (req, res, next) => {

  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardsRouter);
app.use('/tasks', taskRouter);

app.use(errorHandler.handle);

process.on('uncaughtException', (error) => {
  Winston.logger.error('uncaughtException detected:', error);
  process.exit(1);
})
process.on('unhandledRejection', (error) => {
  Winston.logger.error('unhandledRejection detected:', error);
})

// throw Error('Oops! uncaughtException...'); //test point 3

// Promise.reject(Error('Oops! unhandledRejection...')); //test point 4

module.exports = app;
