import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstName: String,
  lastName: String,
  birthday: Date,
  city: String,
  country: String,
  street: String,
  phoneNumber: String,
  jobs_id: String,
  startDate: { type: Date, default: Date.now },
  lastChanged: { type: Date, default: Date.now },
  links: [{
    _id: false,
    rel: String,
    href: String,
  }],
});

export default mongoose.model('Employee', employeeSchema);
