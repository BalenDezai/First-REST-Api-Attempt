import indexDebug from 'debug';
import setUpEnv from './server/util/env';
import config from './server/config/config';
import app from './server/app';


const debug = indexDebug('Index');

app.listen(config.app.port);
debug(`server started on port ${config.app.port}`);

