const Schedule = require('./scheduleModel');
const { isValid } = require('mongoose').Types.ObjectId;

module.exports = class ScheduleController {
  static scheduleidValidParam(req, res, next) {
    //  make sure user put req.params.id is avalid mongoose object
    if (!isValid(req.params.id)) {
      const error = new Error();
      error.status = 404;
      error.resMessage = 'Invalid schedule ID';
      next(error);
    }
    next();
  }

  static async getAllSchedules(req, res, next) {
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
  }

  static async getScheduleById(req, res, next) {
    try {
      const foundSchedule = await Schedule.findOne({ _id: req.params.scheduleId });
      foundSchedule.SetUpHyperLinks(req.headers.host, req.originalUrl);
      res.status(200).json(foundSchedule);
    } catch (error) {
      next(error);
    }
  }

  static async createSchedule(req, res, next) {
    try {
      const newSchedule = {
        _Owner: req.params.id,
        start: req.body.start,
        end: req.body.end,
        holiday: req.body.holiday,
        weekend: req.body.weekend,
      };
      const createdSchedule = await Schedule.create(newSchedule);
      createdSchedule.SetUpHyperLinks(req.headers.host, req.originalUrl);
      res.status(201).json(createdSchedule);
    } catch (error) {
      next(error);
    }
  }

  static async updatedScheduleById(req, res, next) {
    try {
      //  performance might be worse than other options
      //  TODO: reconsider
      delete req.body._id;
      const updatedSchedule = await Schedule
        .findOneAndUpdate({ _id: req.params.scheduleId }, { $set: req.body }, { new: true });
      updatedSchedule.SetUpHyperLinks(req.headers.host, req.originalUrl);
      res.status(200).json(updatedSchedule);
    } catch (error) {
      next(error);
    }
  }

  static async deleteScheduleById(req, res, next) {
    try {
      await Schedule.findOneAndRemove({ _id: req.params.scheduleId });
      res.status(200).json({ status: 200, message: 'Successfully deleted schedule' });
    } catch (error) {
      next(error);
    }
  }
};
