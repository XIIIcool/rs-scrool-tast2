const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardsRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const loginRouter = require('./resources/login/login.router');
const Winston = require('./utils/Logger');
const RequestMiddlewareLog = require('./resources/middlewares/RequestLog');
const errorHandler = require('./resources/errors/errorHandler');
const app = express();
const authorized = require('./resources/middlewares/Authorized');
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/login', loginRouter);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {

  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

// запись всех request запросов
app.use(RequestMiddlewareLog.init);

app.use('/users', authorized, userRouter);
app.use('/boards', authorized, boardsRouter);
app.use('/tasks', authorized, taskRouter);

// мидлвеер ошибок
app.use(errorHandler.handle);

process.on('uncaughtException', (error) => {
  Winston.logger.error('uncaughtException detected:', error);
  process.exit(1);
});
process.on('unhandledRejection', (error) => {
  Winston.logger.error('unhandledRejection detected:', error);
});

// throw Error('Oops! uncaughtException...'); //test point 3

// Promise.reject(Error('Oops! unhandledRejection...')); //test point 4

module.exports = app;
