const morgan = require('morgan');
const bodyParser = require('body-parser');
const corsMiddleware = require('./headersMiddleware/corsMiddleware');
const verifyContentType = require('./headersMiddleware/contentTypeMiddleware');
const getDate = require('../util/getCurrentDate');


module.exports = function middlewareSetup(app) {
  app.disable('x-powered-by');
  app.use(verifyContentType());
  app.use(corsMiddleware());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(morgan((tokens, req, res) => {
    return [
      getDate(),
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
    ].join(' ');
  }));
};
