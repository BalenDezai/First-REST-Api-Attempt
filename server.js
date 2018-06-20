const dotenv = require('dotenv').config();
const debug = require('debug')('Index');
const config = require('./server/config/config');
const app = require('./server/app');

app.listen(config.app.port);
debug(`server started on port ${config.app.port}`);

