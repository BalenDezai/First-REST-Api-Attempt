import express from 'express';
import api from './api/api';
import middlewareSetup from './middleware/appMiddleware';
import startDB from './db';
import seedDb from './util/seedDB';
import sendError from './util/sendError';
import errorHandler from './util/errorHandler';

const app = express();

startDB();
seedDb();


middlewareSetup(app);

app.use('/api/v1', api);

app.use(sendError(404, 'Resource not found'));


app.use(errorHandler());


export default app;

