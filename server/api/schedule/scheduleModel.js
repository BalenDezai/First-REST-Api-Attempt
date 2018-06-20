const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  employee_id: String,
  work_date: Date,
  start_work_hour: Date,
  end_work_hour: Date,
  is_holiday: Boolean,
  is_weekend: Boolean,
  links: [{
    _id: false,
    rel: String,
    href: String,
  }],
});

module.exports = mongoose.model('Schedule', scheduleSchema);
