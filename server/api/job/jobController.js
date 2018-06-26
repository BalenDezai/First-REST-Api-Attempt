const Job = require('./jobModel');

const jobController = {
  FindResource: async (req, res, next) => {
    try {
      const foundJob = await Job.find({ _Owner: req.params.id });
      res.status(200).json(foundJob);
    } catch (error) {
      const err = new Error(error);
      err.status = 500;
      err.resMessage = 'Error processing the request';
      err.catchError = error;
      next(err);
    }
  },

  UpdateResource: async (req, res, next) => {
    try {
      const updatedJob = await Job
        .findOneAndUpdate({ _Owner: req.params.id }, req.body, { new: true });
      res.status(200).json(updatedJob);
    } catch (error) {
      const err = new Error(error);
      err.status = 500;
      err.resMessage = 'Error processing the request';
      err.catchError = error;
      next(err);
    }
  },
};

module.exports = jobController;

