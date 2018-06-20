const express = require('express');
const api = require('./api/api');
const middlewareSetup = require('./middleware/appMiddleware');
const startDB = require('./db');
const seedDb = require('./util/seedDB');
const sendError = require('./util/sendError');
const errorHandler = require('./util/errorHandler');

const app = express();

startDB();
seedDb();


middlewareSetup(app);

app.use('/api/v1', api);

app.use(sendError(404, 'Resource not found'));


app.use(errorHandler());


module.exports = app;

