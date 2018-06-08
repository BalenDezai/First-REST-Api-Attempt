import mongoose from 'mongoose';

const jobTitleSchema = new mongoose.Schema({
  JobTitle: String,
  Description: String,
  Permissions: String,
  _Owner: String,
});

export default mongoose.model('Job', jobTitleSchema);
