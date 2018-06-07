import mongoose from 'mongoose';

const jobTitleSchema = new mongoose.Schema({
  JobTitle: String,
  Description: String,
  Permissions: String,
  _Owner: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Person',
    },
  },
});

export default mongoose.model('Job', jobTitleSchema);
