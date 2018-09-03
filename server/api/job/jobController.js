const { findJobByOwner, findJobByOwnerAndUpdate } = require('./jobService');
const copyObject = require('../../util/clonePropertiesToNewObject');

module.exports = class JobController {
  /**
   *  returns a job document that is owned by a specific owner
   * @param {string} id the id of the jobs owner
   * @param {string} host the host name portion of the requested url
   * @param {string} url the requested url after the hostname
   * @returns {object} job document
   */
  static async getJobByOwnerId(id, host, url) {
    const foundJob = await findJobByOwner(id);
    foundJob.setupHyperLinks(host, url);
    return {
      result: foundJob,
    };
  }

  /**
   *  finds a job by the owner id, updates it, and returns it
   * @param {object} job the new updated job object
   * @param {string} id the id of the job to update
   * @param {string} host the host name portion of the requested url
   * @param {string} url the requested url after the hostname
   */
  static async updateJobByOwnerId(newJob, id, host, url) {
    const job = copyObject(newJob, '_id _Owner');
    const updatedJob = await findJobByOwnerAndUpdate(id, job);
    updatedJob.setupHyperLinks(host, url);
    return {
      result: updatedJob,
    };
  }
};
