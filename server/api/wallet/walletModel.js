const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  wage: { type: Number, default: 0 },
  salary: { type: Number, default: 0 },
  paymentMethod: { type: String, enum: ['Monthly', 'Hourly'], default: 'Hourly' },
  _Owner: { type: String, required: true },
  lastChanged: { type: Date, default: Date.now },
  links: {
    type: [{
      _id: false,
      rel: String,
      href: String,
    }],
    default: [],
  },
});

module.exports = mongoose.model('Wallet', walletSchema);
