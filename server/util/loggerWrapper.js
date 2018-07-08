const winston = require('winston');
const loggerConfig = require('../config/loggerconfig');

const winstonLogger = winston.createLogger(loggerConfig);

const logger = {
  log: (message, level, turnOff) => {
    const off = turnOff || false;
    switch (process.env.NODE_ENV) {
      case 'dev':
        if (level) {
          winstonLogger.log({ level, message });
        } else {
          winstonLogger.log({ level: 'info', message });
        }
        break;
      case 'prod':
        if (off === false) {
          if (level) {
            winstonLogger.log({ level, message });
          } else {
            winstonLogger.log({ level: 'info', message });
          }
        }
        break;
      default:
        break;
    }
  },
};

module.exports = logger;
