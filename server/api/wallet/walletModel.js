const mongoose = require('mongoose');
const hlGenerator = require('../../util/HyperMediaLinksGenerator');

const walletSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
  salary: { type: Number, default: 0 },
  wage: { type: String, enum: ['Monthly', 'Hourly'], default: 'Hourly' },
  _Owner: { type: String, required: true },
  lastChanged: { type: Date, default: () => new Date() },
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

walletSchema.method('SetUpHyperLinks', function setupHL(hostName, url) {
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

module.exports = mongoose.model('Wallet', walletSchema);
