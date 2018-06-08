import mongoose from 'mongoose';

const jobTitleSchema = new mongoose.Schema({
  JobTitle: String,
  Description: String,
  Permissions: String,
  _Owner: String,
  Links: [],
});

export default mongoose.model('Job', jobTitleSchema);
