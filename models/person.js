import mongoose from 'mongoose';

const personSchema = new mongoose.Schema({
  FirstName: String,
  LastName: String,
  Birthday: Date,
  Links: [{
    rel: String,
    href: String,
    type: String,
  }],
});

export default mongoose.model('Person', personSchema);
