import workControllerDebug from 'debug';
import Work from './workModel';
import sendError from '../../util/sendError';

const debug = workControllerDebug('app:workController');

const workController = {
  FindResource: async (req, res) => {
    try {
      debug(req.params.id);
      const foundWork = await Work.find({ _Owner: req.params.id });
      res.json(foundWork);
    } catch (error) {
      debug(error);
      sendError(500, 'Error processing the request', error);
    }
  },

  UpdateResource: async (req, res) => {
    try {
      const updatedWork = await Work.findOneAndUpdate({ _Owner: req.params.id }, req.body, { new: true });
      res.json(updatedWork);
    } catch (error) {
      debug(error);
      sendError(500, 'Error processing the request', error);
    }
  },
};

export default workController;

