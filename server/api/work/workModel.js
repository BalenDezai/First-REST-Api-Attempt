const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  work_start_date: Date,
  work_end_date: Date,
  work_hours_this_tear: Number,
  TotalHours: Number,
  _Owner: String,
  Links: [{
    _id: false,
    rel: String,
    href: String,
  }],
});

module.exports = mongoose.model('Work', workSchema);
