const mongoose = require('mongoose');
const Schedule = require('./scheduleModel');
const hateaosGenerator = require('../../util/HyperMediaLinksGenerator');

const scheduleController = {
  FindResource: async (req, res, next) => {
    try {
      const foundSchedule = await Schedule.find({ _Owner: req.params.id });
      res.status(200).json(foundSchedule);
    } catch (error) {
      const err = new Error(error);
      err.status = 500;
      err.resMessage = 'Error processing the request';
      err.catchError = error;
      next(err);
    }
  },

  findResourceById: async (req, res, next) => {
    try {
      const foundSchedule = await Schedule.findById(req.params.scheduleId);
      res.status(200).json(foundSchedule);
    } catch (error) {
      const err = new Error(error);
      err.status = 500;
      err.resMessage = 'Error processing the request';
      err.catchError = error;
      next(err);
    }
  },

  CreateResource: async (req, res, next) => {
    try {
      const newSchedule = {
        _id: req.body._id || new mongoose.Types.ObjectId(),
        _Owner: req.body._Owner || req.params.id,
        work_date: req.body.work_date || Date.now(),
        start_work_hour: req.body.start_work_hour || Date.now(),
        end_work_hour: req.body.end_Work_hour || Date.now(),
        is_holiday: req.body.is_holiday || false,
        is_weekend: req.body._is_weekend || false,
        links: [],
      };
      hateaosGenerator(newSchedule, req.headers.host, req.originalUrl, ['self']);
      const createdSchedule = await Schedule.create(newSchedule);
      res.status(201).json(createdSchedule);
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
      const updatedSchedule = await Schedule
        .findByIdAndUpdate(req.params.scheduleId, req.body, { new: true });
      res.status(200).json(updatedSchedule);
    } catch (error) {
      const err = new Error(error);
      err.status = 500;
      err.resMessage = 'Error processing the request';
      err.catchError = error;
      next(err);
    }
  },
};

module.exports = scheduleController;
