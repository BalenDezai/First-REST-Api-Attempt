import mongoose from 'mongoose';

const jobTitleSchema = new mongoose.Schema({
  JobTitle: String,
  Description: String,
  Permissions: String,
});

export default mongoose.model('Job', jobTitleSchema);
