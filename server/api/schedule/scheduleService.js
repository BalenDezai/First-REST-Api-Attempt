const Schedule = require('./scheduleModel');

module.exports = class ScheduleService {
  /**
   * finds all schedules belonging to an owner
   * @param {string} ownerId id of the owner
   * @returns {Promise} a promise that resolves to a schedule object
   */
  static findScheduleByOwner(ownerId) {
    return new Promise((resolve, reject) => {
      if (typeof ownerId !== 'string') reject(new Error(`${typeof ownerId} is not a string`));

      resolve(Schedule.find({ _Owner: ownerId }));
    });
  }

  /**
   * gets a schedule by a specific id
   * @param {string} id id to find the schedule by
   * @returns {Promise} a promise that resolves to a schedule object
   */
  static findScheduleById(id) {
    return new Promise((resolve, reject) => {
      if (typeof id !== 'string') reject(new Error(`${typeof id} is not a string`));

      resolve(Schedule.findOne({ _id: id }));
    });
  }
  /**
   * creates a schedule
   * @param {Object} obj schedule to create
   * @returns {Promise} a promise that creates the schedule and returns the created schedule
   */
  static createSchedule(obj) {
    return new Promise((resolve, reject) => {
      if (typeof obj !== 'object') reject(new Error(`${typeof obj} is not an object`));

      if (Array.isArray(obj)) reject(new Error('array is not an object'));

      resolve(Schedule.create(obj));
    });
  }
  /**
   * finds a schedule and updates it
   * @param {Object} obj object to update the schedule with
   * @param {string} id the id to find the schedule by
   * @returns {Promise} a promise that updates the schedule and returns the new updated user
   */
  static findAndUpdateScheduleById(obj, id) {
    return new Promise((resolve, reject) => {
      if (typeof id !== 'string') reject(new Error(`${typeof id} is not a string`));

      if (typeof obj !== 'object') reject(new Error(`${typeof obj} is not an object`));

      if (Array.isArray(obj)) reject(new Error('array is not an object'));

      resolve(Schedule.findOneAndUpdate({ _id: id }, { $set: obj }, { new: true }));
    });
  }
  /**
   * finds a schedule by id and deletes it
   * @param {string} id the id to find the schedule by
   * @returns {Promise} a promise that deletes the schedule and returns the deleted schedule
   */
  static findAndDeleteScheduleById(id) {
    return new Promise((resolve, reject) => {
      if (typeof id !== 'string') reject(new Error(`${typeof id} is not a string`));

      resolve(Schedule.findOneAndRemove({ _id: id }));
    });
  }
  /**
   * creates a schedule model template with set data
   * @param {object} obj the data to set
   * @param {string} id id of the owner of the schedule
   */
  static createScheduleObject(obj, id) {
    if (typeof obj !== 'object') throw new Error(`${typeof obj} is not an object`);

    if (Array.isArray(obj)) throw new Error('array is not an object');

    if (typeof id !== 'string') throw new Error(`${typeof id} is not a string`);

    const createdObj = {
      _Owner: id,
      start: obj.start,
      end: obj.end,
      holiday: obj.holiday,
      weekend: obj.weekend,
    };

    return createdObj;
  }
};
