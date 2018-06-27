const Work = require('./workModel');

const workController = {
  FindResource: async (req, res, next) => {
    try {
      const foundWork = await Work.findOne({ _Owner: req.params.id });
      //  TODO: add hyper links to owner and other items
      res.json(foundWork);
    } catch (error) {
      error.status = 500;
      error.resMessage = 'Error processing the request';
      next(error);
    }
  },

  UpdateResource: async (req, res, next) => {
    try {
      const updatedWork = await Work
        .findOneAndUpdate({ _Owner: req.params.id }, { $set: req.body }, { new: true });
      //  TODO: add hyper links to owner and other items
      res.json(updatedWork);
    } catch (error) {
      error.status = 500;
      error.resMessage = 'Error processing the request';
      next(error);
    }
  },
};

module.exports = workController;

