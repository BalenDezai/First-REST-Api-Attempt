
const {
  findScheduleByOwner,
  findScheduleById,
  createScheduleObject,
  createSchedule,
  findAndUpdateScheduleById,
  findAndDeleteScheduleById,
} = require('./scheduleService');
const { cloneProperties } = require('../../util/utils');

module.exports = class ScheduleController {
  /**
   * gets all the schedules belonging to one employee
   * @param {string} ownerId the id of the schedule owner
   * @param {string} host the host name portion of the requested url
   * @param {string} url the requested url after the hostname
   * @returns {promise} a promise
   */
  static async getAllSchedules(ownerId, host, url) {
    const schedules = await findScheduleByOwner(ownerId);
    if (schedules.length > 0) {
      for (let i = 0; i < schedules.length; i += 1) {
        schedules[i].setupHyperLinks(host, url);
      }
      return {
        result: {
          count: schedules.length,
          schedules,
        },
      };
    }
    return {
      status: 204,
      result: null,
    };
  }
  /**
   * gets a schedule by id and returns it
   * @param {string} id id of the schedule to get
   * @param {string} host the host name portion of the requested url
   * @param {string} url the requested url after the hostname
   * @returns {Promise}
   */
  static async getScheduleById(id, host, url) {
    const foundSchedule = await findScheduleById(id);
    if (foundSchedule) {
      foundSchedule.setupHyperLinks(host, url);
      return {
        result: foundSchedule,
      };
    }
    return {
      status: 204,
      result: null,
    };
  }

  /**
   * creates a new schedule and returns it
   * @param {Obect} obj the schedule to be created
   * @param {string} owner the owner of the schedule
   * @param {string} host the host name portion of the requested url
   * @param {string} url the requested url after the hostname
   * @returns {Promise} a promise that resolves to an object
   */
  static async createSchedule(obj, owner, host, url) {
    const newSchedule = createScheduleObject(obj, owner);
    const createdSchedule = await createSchedule(newSchedule);
    createdSchedule.setupHyperLinks(host, url);
    return {
      status: 201,
      result: createdSchedule,
    };
  }
  /**
   * updates a schedule and returns the new updated schedule
   * @param {object} obj the object to update the schedule with
   * @param {string} id id of the schedule to update
   * @param {string} host the host name portion of the requested url
   * @param {strng} url the requested url after the hostname
   * @returns {Promise} a promise that resolves to an object
   */
  static async updateScheduleById(obj, id, host, url) {
    const updated = cloneProperties(obj, '_id _Owner');
    const updatedSchedule = await findAndUpdateScheduleById(updated, id);
    updatedSchedule.setupHyperLinks(host, url);
    return {
      result: updatedSchedule,
    };
  }
  /**
   * deletes a schedule by a given id
   * @param {string} id id of the schedule to delete
   */
  static async deleteScheduleById(id) {
    await findAndDeleteScheduleById(id);
    return {
      result: 'Successfully deleted schedule',
    };
  }
};
