const debug = require('debug')('app:scheduleController');
const Schedule = require('./scheduleModel');
const sendError = require('../../util/sendError');

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

module.exports = scheduleController;
