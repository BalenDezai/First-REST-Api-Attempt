import morgan from 'morgan';
import bodyParser from 'body-parser';
import corsMiddleware from './corsMiddleware';

export default function (app) {
  app.use(corsMiddleware());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(morgan('combined'));
}
