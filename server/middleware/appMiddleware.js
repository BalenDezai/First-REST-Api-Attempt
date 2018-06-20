const morgan = require('morgan');
const bodyParser = require('body-parser');
const corsMiddleware = require('./corsMiddleware');

module.exports = function middlewareSetup(app) {
  app.use(corsMiddleware());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(morgan('combined'));
};
