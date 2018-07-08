const mongoose = require('mongoose');
const Schedule = require('./scheduleModel');

const scheduleController = {
  FindResource: async (req, res, next) => {
    try {
      const foundSchedule = await Schedule.find({ _Owner: req.params.id });
      foundSchedule.forEach((schedule) => {
        schedule.SetUpHyperLinks(req.headers.host, req.originalUrl);
      });
      const documents = {
        count: foundSchedule.length,
        schedules: foundSchedule,
      };
      if (documents.count > 0) {
        res.status(200).json(documents);
      } else {
        res.status(204).json(documents);
      }
    } catch (error) {
      error.status = 500;
      error.resMessage = 'Error processing the request';
      next(error);
    }
  },

  findResourceById: async (req, res, next) => {
    try {
      const foundSchedule = await Schedule.findOne({ _id: req.params.scheduleId });
      foundSchedule.SetUpHyperLinks(req.headers.host, req.originalUrl);
      res.status(200).json(foundSchedule);
    } catch (error) {
      error.status = 500;
      error.resMessage = 'Error processing the request';
      next(error);
    }
  },

  CreateResource: async (req, res, next) => {
    try {
      const newSchedule = {
        _id: new mongoose.Types.ObjectId(),
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
      error.status = 500;
      error.resMessage = 'Error processing the request';
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
      error.status = 500;
      error.resMessage = 'Error processing the request';
      next(error);
    }
  },
  DeleteResource: async (req, res, next) => {
    try {
      await Schedule.findOneAndRemove({ _id: req.params.scheduleId });
      res.status(200).json({ status: 200, message: 'Successfully deleted schedule' });
    } catch (error) {
      error.status = 500;
      error.resMessage = 'Error processing the request';
      next(error);
    }
  },
};

module.exports = scheduleController;
