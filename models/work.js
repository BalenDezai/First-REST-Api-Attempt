import mongoose from 'mongoose';
import { Module } from 'module';

const workSchema = new mongoose.Schema({
  StartDate: Date,
  EndDate: Date,
  WorkHoursThisYear: Number,
  TotalHours: Number
});

export default mongoose.model('Work', workSchema);