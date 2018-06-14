import indexDebug from 'debug';
import setUpEnv from './server/util/env';
import config from './server/config/config';
import server from './server/server';


const debug = indexDebug('Index');

server.listen(config.app.port);
debug(`server started on port ${config.app.port}`);

