const hateaosGenerator = require('./HyperMediaLinksGenerator');

function recordGenerator(employeeId, mongooseInstance, hostname, url) {
  const jobTemplate = {
    _id: mongooseInstance.Types.ObjectId(),
    jobTitle: '',
    description: '',
    _Owner: employeeId,
    permissions: [],
    links: [],
  };
  hateaosGenerator(jobTemplate, hostname, `${url}/${employeeId}/job`, ['self']);

  const scheduleTemplate = {
    _id: mongooseInstance.Types.ObjectId(),
    _Owner: '',
    work_date: '',
    start_work_hour: '',
    end_work_hour: '',
    is_holiday: false,
    is_weekend: false,
    links: [],
  };
  hateaosGenerator(scheduleTemplate, hostname, `${url}/${employeeId}/schedule`, ['self']);

  const walletTemplate = {
    _id: mongooseInstance.Types.ObjectId(),
    wage: 0,
    salary: 0,
    paymentMethod: 'Hourly',
    _Owner: employeeId,
    lastChanged: Date.now(),
    links: [],
  };
  hateaosGenerator(walletTemplate, hostname, `${url}/${employeeId}/wallet`, ['self']);

  const workhourTemplate = {
    _id: mongooseInstance.Types.ObjectId(),
    work_start_date: Date.now(),
    work_end_date: Date.now(),
    work_hours_this_tear: 0,
    TotalHours: 0,
    _Owner: employeeId,
    links: [],
  };
  hateaosGenerator(workhourTemplate, hostname, `${url}/${employeeId}/workhours`, ['self']);

  return {
    jobTemplate,
    scheduleTemplate,
    walletTemplate,
    workhourTemplate,
  };
}
module.exports = recordGenerator;
