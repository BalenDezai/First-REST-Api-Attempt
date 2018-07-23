const mongoose = require('mongoose');
const hlGenerator = require('../../util/HyperMediaLinksGenerator');

const workSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, default: new mongoose.Types.ObjectId() },
  work_start_date: { type: Date, default: Date.now() },
  work_end_date: { type: Date, default: Date.now() },
  work_hours_this_tear: { type: Number, default: 0 },
  TotalHours: { type: Number, default: 0 },
  _Owner: { type: String, required: true },
  links: {
    type: [{
      _id: false,
      rel: String,
      type: { type: String, enum: ['GET', 'POST', 'PATCH', 'DELETE'] },
      href: String,
      description: String,
    }],
    default: [],
  },
});

workSchema.method('SetUpHyperLinks', function setupHL(hostName, url) {
  {
    const hateaosEndpoints = [
      {
        rel: 'owner',
        type: 'GET',
        description: 'get this jobs owner',
      },
      {
        rel: 'self',
        type: 'PATCH',
        description: 'update this job',
      },
    ];
    hlGenerator(this, hostName, url, hateaosEndpoints, true);
  }
});

module.exports = mongoose.model('Work', workSchema);
