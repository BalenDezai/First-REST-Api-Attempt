const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  _Owner: { type: String, required: true },
  work_date: { type: Date, required: true },
  start_work_hour: { type: Date, required: true },
  end_work_hour: { type: Date, required: true },
  is_holiday: { type: Boolean, default: false },
  is_weekend: { type: Boolean, default: false },
  links: {
    type: [{
      _id: false,
      rel: String,
      href: String,
    }],
    default: [],
  },
});

module.exports = mongoose.model('Schedule', scheduleSchema);
