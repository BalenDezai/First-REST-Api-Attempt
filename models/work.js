import mongoose from 'mongoose';

const workSchema = new mongoose.Schema({
  StartDate: Date,
  EndDate: Date,
  WorkHoursThisYear: Number,
  TotalHours: Number,
  _Owner: String,
  Links: [],
});

export default mongoose.model('Work', workSchema);
