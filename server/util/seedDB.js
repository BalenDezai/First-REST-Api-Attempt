const faker = require('faker');
const mongoose = require('mongoose');
const Employee = require('../api/employee/employeeModel');
const Job = require('../api/job/jobModel');
const Wallet = require('../api/wallet/walletModel');
const Work = require('../api/work/workModel');
const User = require('../api/user/userModel');
const Schedule = require('../api/schedule/scheduleModel');
const logger = require('./loggerWrapper');

const employees = [];
const jobs = [];
const schedules = [];
const wallets = [];
const works = [];


for (let index = 0; index < 20; index += 1) {

  const employee = {
    _id: new mongoose.Types.ObjectId(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    birthday: faker.date.past(),
    city: faker.address.city(),
    country: faker.address.country(),
    street: faker.address.streetAddress(),
    phoneNumber: faker.phone.phoneNumber(),
    startDate: faker.date.past(),
    lastChanged: faker.date.past(),
    links: [],
  };
  const job = {
    _id: new mongoose.Types.ObjectId(),
    jobTitle: faker.name.jobTitle(),
    description: faker.name.jobDescriptor(),
    _Owner: employee._id,
    links: [],
  };

  const schedule = {
    _id: new mongoose.Types.ObjectId(),
    _Owner: employee._id,
    work_date: faker.date.future(),
    start_work_hour: faker.date.future(),
    end_work_hour: faker.date.future(),
    is_holiday: faker.random.boolean(),
    is_weekend: faker.random.boolean(),
    links: [],
  };

  const wallet = {
    _id: new mongoose.Types.ObjectId(),
    wage: faker.finance.amount(),
    salary: faker.finance.amount(),
    paymentMethod: faker.random.arrayElement(['Monthly', 'Hourly']),
    _Owner: employee._id,
    lastChanged: faker.date.past(),
    links: [],
  };

  const work = {
    _id: new mongoose.Types.ObjectId(),
    work_start_date: faker.date.past(),
    work_end_date: faker.date.future(),
    work_hours_this_tear: faker.finance.amount(),
    TotalHours: faker.finance.amount(),
    _Owner: employee._id,
    links: [],
  };

  employees.push(employee);
  jobs.push(job);
  schedules.push(schedule);
  wallets.push(wallet);
  works.push(work);
}

module.exports = async function SeedDB() {
  try {
    await Employee.remove();
    await Job.remove();
    await Schedule.remove();
    await Wallet.remove();
    await Work.remove();
    await User.remove();

    await Employee.create(employees);
    await Job.create(jobs);
    await Schedule.create(schedules);
    await Wallet.create(wallets);
    await Work.create(works);
    await User.create({
      _id: new mongoose.Types.ObjectId(),
      username: 'test',
      email: employees[0].email,
      role: 'Master Administrator',
      password: 'test',
      links: [],
    });

    logger.log('Removed and seeded DB', 'info', true);
  } catch (error) {
    logger.log(error, 'error');
  }
};
