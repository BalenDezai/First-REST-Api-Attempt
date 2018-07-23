const Work = require('./workModel');

const workController = {
  FindResource: async (req, res, next) => {
    try {
      const foundWork = await Work.findOne({ _Owner: req.params.id });
      foundWork.SetUpHyperLinks(req.headers.host, req.originalUrl);
      res.json(foundWork);
    } catch (error) {
      next(error);
    }
  },

  UpdateResource: async (req, res, next) => {
    try {
      const updatedWork = await Work
        .findOneAndUpdate({ _Owner: req.params.id }, { $set: req.body }, { new: true });
      updatedWork.SetUpHyperLinks(req.headers.host, req.originalUrl);
      res.json(updatedWork);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = workController;

