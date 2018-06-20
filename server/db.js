const mongoose = require('mongoose');
const config = require('./config/config');

const connectionString = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`;

module.exports = function StartDb() {
  mongoose.connect(connectionString);
};
