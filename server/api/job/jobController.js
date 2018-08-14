const Job = require('./jobModel');
const copyObject = require('../../util/clonePropertiesToNewObject');

module.exports = class JobController {
  static async getJobById(req, res, next) {
    try {
      const foundJob = await Job.findOne({ _Owner: req.params.id });
      foundJob.SetUpHyperLinks(req.headers.host, req.originalUrl);
      res.status(200).json(foundJob);
    } catch (error) {
      next(error);
    }
  }

  static async updateJobById(req, res, next) {
    try {
      req.body = copyObject(req.body, '_id _Owner');
      const updatedJob = await Job
        .findOneAndUpdate({ _Owner: req.params.id }, { $set: req.body }, { new: true });
      updatedJob.SetUpHyperLinks(req.headers.host, req.originalUrl);
      res.status(200).json(updatedJob);
    } catch (error) {
      next(error);
    }
  }
};
