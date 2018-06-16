import mongoose from 'mongoose';
import config from './config/config';

const connectionString = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`;

export default function StartDb() {
  mongoose.connect(connectionString);
}
