const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthday: { type: Date, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  street: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  startDate: { type: Date, default: Date.now },
  lastChanged: { type: Date, default: Date.now },
  links: [{
    _id: false,
    rel: String,
    href: String,
  }],
});

module.exports = mongoose.model('Employee', employeeSchema);
