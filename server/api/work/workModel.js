const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  work_start_date: { type: Date, default: Date.now() },
  work_end_date: { type: Date, default: Date.now() },
  work_hours_this_tear: { type: Number, default: 0 },
  TotalHours: { type: Number, default: 0 },
  _Owner: { type: String, required: true },
  Links: {
    type: [{
      _id: false,
      rel: String,
      href: String,
    }],
    default: [],
  },
});

module.exports = mongoose.model('Work', workSchema);
