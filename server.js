const dotenv = require('dotenv').config();
const config = require('./server/config/config');
const app = require('./server/app');
const logger = require('./server/util/loggerWrapper');

app.listen(config.app.port);
logger.log(`server started on port ${config.app.port}`, 'info', true);

