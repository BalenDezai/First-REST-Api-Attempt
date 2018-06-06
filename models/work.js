import mongoose from 'mongoose';

const workSchema = new mongoose.Schema({
  StartDate: Date,
  EndDate: Date,
  WorkHoursThisYear: Number,
  TotalHours: Number,
});

export default mongoose.model('Work', workSchema);
