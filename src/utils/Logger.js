const fs = require('fs');
const { createLogger, format, transports } = require('winston');
const path = require('path');

const requestFile = path.join(__dirname, '../logs/logs.log');
// const errorFile = path.join(__dirname, '../logs/error.log');
// const combinedFile = path.join(__dirname, '../logs/combined.log');

try {
  fs.unlinkSync(requestFile);
  // fs.unlinkSync(errorFile);
  // fs.unlinkSync(combinedFile);
}
catch (ex) { }

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: {},
  transports: [

    // new transports.File({ filename: logs, level: 'info' }),
    // new transports.File({ filename: errorFile, level: 'error' }),
    new transports.File({ filename: requestFile })
  ]
});

//
// If we're not in production then **ALSO** log to the `console`
// with the colorized simple format.
//
// if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple()
    )
  }));
// }

module.exports = {
  logger
}
