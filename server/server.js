import express from 'express';
import api from './api/api';
import middlewareSetup from './middleware/appMiddleware';
import startDB from './db';
import seedDb from './util/seedDB';

const server = express();

startDB();
seedDb();


middlewareSetup(server);

server.use('/api/v1', api);

export default server;

