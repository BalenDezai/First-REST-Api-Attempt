const mongoose = require('mongoose');
const config = require('./config/config');
const logger = require('./util/loggerWrapper');

const connectionString = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`;

module.exports = function StartDb() {
  try {
    mongoose.connect(connectionString, { useNewUrlParser: true });
  } catch (error) {
    logger.log(error, 'error');
  }
};
