import mongoose from 'mongoose';

const workSchema = new mongoose.Schema({
  StartDate: Date,
  EndDate: Date,
  WorkHoursThisYear: Number,
  TotalHours: Number,
  _Owner: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Person',
    },
  },
});

export default mongoose.model('Work', workSchema);
