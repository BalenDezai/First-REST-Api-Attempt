
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

  static async createSchedule(obj, owner, host, url) {
    const newSchedule = createScheduleObject(owner, obj);
    const createdSchedule = await createSchedule(newSchedule);
    createdSchedule.SetUpHyperLinks(host, url);
    return {
      status: 201,
      result: createdSchedule,
    };
  }

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
