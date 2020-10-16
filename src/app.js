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

// app.use((request, response, next) => (next(createError(404))));

// app.use((request, response, err) => {
//   console.log(err);
// })

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

app.use(errorHandler.handle)

app.use(function(err, req, res, next){
  // we may use properties of the error object
  // here and next(err) appropriately, or if
  // we possibly recovered from the error, simply next().
  res.status(err.status || 500);
  res.render('500', { error: err });
});

process.on('uncaughtException', (error) => {
  Winston.logger.error('uncaughtException detected:', error);
  process.exit(1);
})
process.on('unhandledRejection', (error) => {
  Winston.logger.error('unhandledRejection detected:', error);
})


module.exports = app;
