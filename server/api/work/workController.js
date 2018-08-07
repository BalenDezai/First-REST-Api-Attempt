const Work = require('./workModel');

module.exports = class WorkController {
  static async getWorkById(req, res, next) {
    try {
      const foundWork = await Work.findOne({ _Owner: req.params.id });
      foundWork.SetUpHyperLinks(req.headers.host, req.originalUrl);
      res.json(foundWork);
    } catch (error) {
      next(error);
    }
  }

  static async updateWorkById(req, res, next) {
    try {
      //  performance might be worse than other options
      //  TODO: reconsider
      delete req.body._id;
      delete req.body._Owner;
      const updatedWork = await Work
        .findOneAndUpdate({ _Owner: req.params.id }, { $set: req.body }, { new: true });
      updatedWork.SetUpHyperLinks(req.headers.host, req.originalUrl);
      res.json(updatedWork);
    } catch (error) {
      next(error);
    }
  }
};
