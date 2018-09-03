const Schedule = require('./scheduleModel');

module.exports = class ScheduleService {
  static findScheduleByOwner(ownerId) {
    return new Promise((resolve, reject) => {
      if (typeof ownerId !== 'string') reject(new Error(`${typeof ownerId} is not a string`));

      resolve(Schedule.find({ _Owner: ownerId }));
    });
  }

  static findScheduleById(id) {
    return new Promise((resolve, reject) => {
      if (typeof id !== 'string') reject(new Error(`${typeof id} is not a string`));

      resolve(Schedule.findOne({ _id: id }));
    });
  }

  static createSchedule(obj) {
    return new Promise((resolve, reject) => {
      if (typeof obj !== 'object') reject(new Error(`${typeof obj} is not a string`));

      resolve(Schedule.create(obj));
    });
  }

  static findAndUpdateScheduleById(obj, id) {
    return new Promise((resolve, reject) => {
      if (typeof id !== 'string') reject(new Error(`${typeof id} is not a string`));

      if (typeof obj !== 'object') reject(new Error(`${typeof obj} is not an object`));

      if (Array.isArray(obj)) reject(new Error('array is not an object'));

      resolve(Schedule.findOneAndUpdate({ _id: id }, { $set: obj }, { new: true }));
    });
  }

  static findAndDeleteSCheduleById(id) {
    return new Promise((resolve, reject) => {
      if (typeof id !== 'string') reject(new Error(`${typeof id} is not a string`));

      resolve(Schedule.findOneAndRemove({ _id: id }));
    });
  }

  static createScheduleObject(obj, owner) {
    return {
      _Owner: owner,
      start: obj.start,
      end: obj.end,
      holiday: obj.holiday,
      weekend: obj.weekend,
    };
  }
};
