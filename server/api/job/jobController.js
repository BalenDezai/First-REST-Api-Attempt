const Job = require('./jobModel');
const hlGenerator = require('../../util/HyperMediaLinksGenerator');

const jobController = {
  FindResource: async (req, res, next) => {
    try {
      const foundJob = await Job.findOne({ _Owner: req.params.id });
      //  TODO: add hyper links to owner and other items
      res.status(200).json(foundJob);
    } catch (error) {
      error.status = 500;
      error.resMessage = 'Error processing the request';
      next(error);
    }
  },

  UpdateResource: async (req, res, next) => {
    try {
      const updatedJob = await Job
        .findOneAndUpdate({ _Owner: req.params.id }, { $set: req.body }, { new: true });
        //  TODO: add hyper links to owner and other items
      res.status(200).json(updatedJob);
    } catch (error) {
      error.status = 500;
      error.resMessage = 'Error processing the request';
      next(error);
    }
  },
};

module.exports = jobController;

