const winston = require('winston');

const prod = [
  new winston.transports.File({ filename: 'error.log', level: 'error' }),
  new winston.transports.File({
    filename: 'combined.log',
    format:
      winston.format.combine(
        winston.format.timestamp(),
        winston.format.prettyPrint(),
      ),
  }),
];

const dev = [
  new winston.transports.Console({
    format:
    winston.format.combine(
      winston.format.colorize(),
      winston.format.simple(),
    ),
  }),
];


const loggerconfig = {
  level: 'info',
  transports: process.env.NODE_ENV === 'prod' ? prod : dev,
  exceptionHandlers: process.env.NODE_ENV === 'prod' ? prod : dev,
  silent: false,
};

module.exports = loggerconfig;
