
const {
  findScheduleByOwner,
  findScheduleById,
  createScheduleObject,
  createSchedule,
  findAndUpdateScheduleById,
  findAndDeleteSCheduleById
} = require('./scheduleService');
const copyObject = require('../../util/clonePropertiesToNewObject');

module.exports = class ScheduleController {

  /**
   * gets all the schedules 
   * @param {string} ownerId the id of the schedule owner
   * @param {string} host the host name portion of the requested url
   * @param {string} url the requested url after the hostname
   * @returns {promise} a promise
   */
  static async getAllSchedules(ownerId, host, url) {
    const schedules = await findScheduleByOwner(ownerId);
    if (schedules.length > 0) {
      for (let i = 0; i < schedules.length; i += 1) {
        schedules[i].SetUpHyperLinks(host, url);
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
      foundSchedule.SetUpHyperLinks(host, url);
      return {
        result: foundSchedule,
      };
    }
    return {
      status: 204,
      resulT: null,
    };
  }

  /**
   * creates a new schedule and returns it
   * @param {Obect} obj 
   * @param {string} owner 
   * @param {string} host 
   * @param {string} url 
   */
  static async createSchedule(obj, owner, host, url) {
    const newSchedule = createScheduleObject(owner, obj);
    const createdSchedule = await createSchedule(newSchedule);
    createdSchedule.SetUpHyperLinks(host, url);
    return {
      status: 201,
      result: createdSchedule,
    };
  }
/**
 * 
 * @param {*} obj 
 * @param {*} id 
 * @param {*} host 
 * @param {*} url 
 */
  static async updateScheduleById(obj, id, host, url) {
    const updated = copyObject(obj, '_id _Owner');
    const updatedSchedule = await findAndUpdateScheduleById(updated, id);
    updatedSchedule.SetUpHyperLinks(host, url);
    return {
      result: updatedSchedule,
    };
  }

  static async deleteScheduleById(id) {
    await findAndDeleteSCheduleById(id);
    return {
      result: 'Successfully deleted schedule',
    };
  }
};
