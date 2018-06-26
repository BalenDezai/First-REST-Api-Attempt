const Work = require('./workModel');

const workController = {
  FindResource: async (req, res, next) => {
    try {
      const foundWork = await Work.find({ _Owner: req.params.id });
      res.json(foundWork);
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
      const updatedWork = await Work.findOneAndUpdate({ _Owner: req.params.id }, req.body, { new: true });
      res.json(updatedWork);
    } catch (error) {
      const err = new Error(error);
      err.status = 500;
      err.resMessage = 'Error processing the request';
      err.catchError = error;
      next(err);
    }
  },
};

module.exports = workController;

