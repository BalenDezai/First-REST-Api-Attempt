import scheduleControllerDebug from 'debug';
import Schedule from './scheduleModel';
import sendError from '../../util/sendError';

const debug = scheduleControllerDebug('app:scheduleController');

const scheduleController = {
  FindResource: async (req, res) => {
    try {
      const foundSchedule = await Schedule.find({ _Owner: req.params.id });
      res.status(200).json(foundSchedule);
    } catch (error) {
      debug(error);
      sendError(500, 'Error processing the request', error);
    }
  },

  UpdateResource: async (req, res) => {
    try {
      const updatedSchedule = await Schedule.findOneAndUpdate({ _Owner: req.params.id }, req.body, { new: true });
      res.status(200).json(updatedSchedule);
    } catch (error) {
      debug(error);
      sendError(500, 'Error processing the request', error);
    }
  },
};

export default scheduleController;
