const Job = require('./jobModel');

const jobController = {
  FindResource: async (req, res, next) => {
    try {
      const foundJob = await Job.findOne({ _Owner: req.params.id });
      foundJob.SetUpHyperLinks(req.headers.host, req.originalUrl);
      res.status(200).json(foundJob);
    } catch (error) {
      next(error);
    }
  },

  UpdateResource: async (req, res, next) => {
    try {
      const updatedJob = await Job
        .findOneAndUpdate({ _Owner: req.params.id }, { $set: req.body }, { new: true });
      updatedJob.SetUpHyperLinks(req.headers.host, req.originalUrl);
      res.status(200).json(updatedJob);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = jobController;

