import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  jobTitle: String,
  description: String,
  _Owner: String,
  permissions: [],
  links: [{
    _id: false,
    rel: String,
    href: String,
  }],
});

export default mongoose.model('Job', jobSchema);
