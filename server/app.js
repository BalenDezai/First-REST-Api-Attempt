const express = require('express');
const api = require('./api/api');
const middlewareSetup = require('./middleware/appMiddleware');
const startDB = require('./db');
const seedDb = require('./util/seedDB');
const errorHandler = require('./util/errorHandler');

const app = express();

startDB();
seedDb();


middlewareSetup(app);

app.use('/api/v1', api);

app.use((req, res, next) => {
  const error = new Error('Resource not found');
  error.status = 404;
  next(error);
});


app.use(errorHandler());


module.exports = app;

