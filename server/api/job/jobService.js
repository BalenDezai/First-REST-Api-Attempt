const Job = require('./jobModel');

module.exports = class JobService {
  /**
   *  finds a job by the owner id
   * @param {*} ownerId id of the jobs owner
   * @returns {promise} a promise that resolves to a job document
   */
  static findJobByOwner(ownerId) {
    return new Promise((resolve, reject) => {
      if (typeof ownerId !== 'string') reject(new Error(`${typeof ownerId} is not a string`));

      resolve(Job.findOne({ _Owner: ownerId }));
    });
  }

  /**
   *  finds a job document by the owners id, updates it and returns it
   * @param {string} ownerId id of the jobs owner
   * @param {object} obj the obj to update the current job document with
   * @returns {promise} a promise that resolves to the new updated job document
   */
  static findJobByOwnerAndUpdate(ownerId, obj) {
    return new Promise((resolve, reject) => {
      if (typeof ownerId !== 'string') reject(new Error(`${typeof ownerId} is not a string`));

      if (typeof obj !== 'object') reject(new Error(`${typeof obj} is not an object`));

      if (Array.isArray(obj)) reject(new Error('array is not an object'));

      resolve(Job.findOneAndUpdate({ _Owner: ownerId }, { $set: obj }, { new: true }));
    });
  }
};

