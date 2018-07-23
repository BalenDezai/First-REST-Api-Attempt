const Schedule = require('./scheduleModel');

const scheduleController = {
  FindResource: async (req, res, next) => {
    try {
      const foundSchedule = await Schedule.find({ _Owner: req.params.id });
      const documents = {
        count: foundSchedule.length,
        schedules: foundSchedule,
      };
      if (documents.count > 0) {
        for (let i = 0; i < foundSchedule.length; i += 1) {
          foundSchedule[i].SetUpHyperLinks(req.headers.host, req.originalUrl);
        }
        res.status(200).json(documents);
      } else {
        res.status(204).json(documents);
      }
    } catch (error) {
      next(error);
    }
  },

  findResourceById: async (req, res, next) => {
    try {
      const foundSchedule = await Schedule.findOne({ _id: req.params.scheduleId });
      foundSchedule.SetUpHyperLinks(req.headers.host, req.originalUrl);
      res.status(200).json(foundSchedule);
    } catch (error) {
      next(error);
    }
  },

  CreateResource: async (req, res, next) => {
    try {
      const newSchedule = {
        _Owner: req.body._Owner || req.params.id,
        work_date: req.body.work_date,
        start_work_hour: req.body.start_work_hour,
        end_work_hour: req.body.end_work_hour,
        is_holiday: req.body.is_holiday,
        is_weekend: req.body._is_weekend,
      };
      const createdSchedule = await Schedule.create(newSchedule);
      createdSchedule.SetUpHyperLinks(req.headers.host, req.originalUrl);
      res.status(201).json(createdSchedule);
    } catch (error) {
      next(error);
    }
  },

  UpdateResource: async (req, res, next) => {
    try {
      const updatedSchedule = await Schedule
        .findOneAndUpdate({ _id: req.params.scheduleId }, { $set: req.body }, { new: true });
      updatedSchedule.SetUpHyperLinks(req.headers.host, req.originalUrl);
      res.status(200).json(updatedSchedule);
    } catch (error) {
      next(error);
    }
  },

  DeleteResource: async (req, res, next) => {
    try {
      await Schedule.findOneAndRemove({ _id: req.params.scheduleId });
      res.status(200).json({ status: 200, message: 'Successfully deleted schedule' });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = scheduleController;
