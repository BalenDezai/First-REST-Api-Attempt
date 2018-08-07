const mongoose = require('mongoose');
const hlGenerator = require('../../util/HyperMediaLinksGenerator');

const employeeSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, require: true },
  birthday: { type: Date, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  street: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  startDate: { type: Date, default: () => new Date() },
  lastChanged: { type: Date, default: () => new Date() },
  links: [{
    _id: false,
    rel: String,
    type: { type: String, enum: ['GET', 'POST', 'PATCH', 'DELETE'] },
    href: String,
    description: String,
  }],
});

employeeSchema.method('SetUpHyperLinks', function setupHL(hostName, url, isChild) {
  {
    const hateaosEndpoints = [
      {
        rel: 'self',
        type: 'GET',
        description: 'view this employee',
      },
      {
        rel: 'self',
        type: 'PATCH',
        description: 'update this employee',
      },
      {
        rel: 'self',
        type: 'DELETE',
        description: 'delete this employee',
      },
      {
        rel: 'job',
        type: 'GET',
        description: 'get employees job',
      },
      {
        rel: 'wallet',
        type: 'GET',
        description: 'get employees wallet',
      },
      {
        rel: 'schedules',
        type: 'GET',
        description: 'get employees schedules',
      },
      {
        rel: 'work',
        type: 'GET',
        description: 'get employees work',
      },
    ];
    const isUnderChild = isChild || false;
    hlGenerator(this, hostName, url, hateaosEndpoints, isUnderChild);
  }
});

module.exports = mongoose.model('Employee', employeeSchema);
