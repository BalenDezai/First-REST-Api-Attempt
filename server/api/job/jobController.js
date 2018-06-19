import jobControllerDebug from 'debug';
import Job from './jobModel';
import sendError from '../../util/sendError';

const debug = jobControllerDebug('app:jobController');

const jobController = {
  FindResource: async (req, res) => {
    try {
      const foundJob = await Job.find({ _Owner: req.params.id });
      res.status(200).json(foundJob);
    } catch (error) {
      debug(error);
      sendError(500, 'Error processing the request', error);
    }
  },

  UpdateResource: async (req, res) => {
    try {
      const updatedJob = await Job.findOneAndUpdate({ _Owner: req.params.id }, req.body, { new: true });
      res.status(200).json(updatedJob);
    } catch (error) {
      debug(error);
      sendError(500, 'Error processing the request', error);
    }
  },
};

export default jobController;

