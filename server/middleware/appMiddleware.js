const morgan = require('morgan');
const bodyParser = require('body-parser');
const corsMiddleware = require('./headersMiddleware/corsMiddleware');
const verifyContentType = require('./headersMiddleware/contentTypeMiddleware');

module.exports = function middlewareSetup(app) {
  app.disable('x-powered-by');
  app.use(verifyContentType());
  app.use(corsMiddleware());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(morgan('combined'));
};
