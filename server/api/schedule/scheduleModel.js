const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  _Owner: { type: String, required: true },
  work_date: { type: Date, required: true },
  start_work_hour: { type: Date, required: true },
  end_work_hour: { type: Date, required: true },
  is_holiday: { type: Boolean, required: true },
  is_weekend: { type: Boolean, required: true },
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
