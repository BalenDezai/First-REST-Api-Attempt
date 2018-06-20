const debug = require('debug')('app:workController');
const Work = require('./workModel');
const sendError = require('../../util/sendError');

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

module.exports = workController;

