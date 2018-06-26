const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  jobTitle: { type: String, default: 'Empty' },
  description: { type: String, default: 'Empty' },
  _Owner: { type: String, required: true },
  permissions: { type: [], default: [] },
  links: {
    type: [{
      _id: false,
      rel: String,
      href: String,
    }],
    default: [],
  },
});

module.exports = mongoose.model('Job', jobSchema);
