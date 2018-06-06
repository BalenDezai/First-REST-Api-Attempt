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
  _Wallet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Wallet',
  },
  _Job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
  },
  _Work: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Work',
  },
});

export default mongoose.model('Person', personSchema);
