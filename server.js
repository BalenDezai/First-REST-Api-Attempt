const dotenv = require('dotenv').config();
const http = require('http');
const config = require('./server/config/config');
const app = require('./server/app');
const logger = require('./server/util/loggerWrapper');

const server = http.createServer(app);

server.listen(config.app.port);
logger.log(`server started on port ${config.app.port}`, 'info', true);
