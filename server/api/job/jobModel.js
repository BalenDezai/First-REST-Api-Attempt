const mongoose = require('mongoose');
const hlGenerator = require('../../util/HyperMediaLinksGenerator');

const jobSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
  jobTitle: { type: String, default: 'Empty' },
  description: { type: String, default: 'Empty' },
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

jobSchema.method('setupHyperLinks', function setupHL(hostName, url) {
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
    hlGenerator(this, hostName, url, hateaosEndpoints, { isChild: true });
  }
});

module.exports = mongoose.model('Job', jobSchema);
