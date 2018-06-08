import mongoose from 'mongoose';

const personSchema = new mongoose.Schema({
  FirstName: String,
  LastName: String,
  Birthday: Date,
  Links: [],
});

export default mongoose.model('Person', personSchema);
