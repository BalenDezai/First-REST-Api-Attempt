const faker = require('faker');
const mongoose = require('mongoose');
const Employee = require('../api/employee/employeeModel');
const Job = require('../api/job/jobModel');
const Wallet = require('../api/wallet/walletModel');
const Work = require('../api/work/workModel');
const User = require('../api/user/userModel');
const Schedule = require('../api/schedule/scheduleModel');
const logger = require('./loggerWrapper');

const users = [];
const employees = [];
const jobs = [];
const schedules = [];
const wallets = [];
const works = [];


for (let index = 0; index < 20; index += 1) {

  const empId = new mongoose.Types.ObjectId();

  const user = {
    _id: new mongoose.Types.ObjectId(),
    username: `${faker.random.word()}${faker.name.firstName()}`,
    email: faker.internet.email(),
    role: faker.random.arrayElement(['Master administrator', 'Administrative', 'Employee']),
    employee: empId,
    password: faker.random.word(),
  };

  const employee = {
    _id: empId,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    birthday: faker.date.past(),
    city: faker.address.city(),
    country: faker.address.country(),
    user: user._id,
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
    start: faker.date.future(),
    end: faker.date.future(),
    holiday: faker.random.boolean(),
    weekend: faker.random.boolean(),
    links: [],
  };

  const wallet = {
    _id: new mongoose.Types.ObjectId(),
    wage: faker.random.arrayElement(['Monthly', 'Hourly']),
    salary: faker.finance.amount(),
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


  users.push(user);
  employees.push(employee);
  jobs.push(job);
  schedules.push(schedule);
  wallets.push(wallet);
  works.push(work);
}

module.exports = async function SeedDB() {
  const deleteAll = [
    Employee.remove(),
    Job.remove(),
    Schedule.remove(),
    Wallet.remove(),
    Work.remove(),
    User.remove(),
  ];
  const createalll = [
    User.create(users),
    Employee.create(employees),
    Job.create(jobs),
    Schedule.create(schedules),
    Wallet.create(wallets),
    Work.create(works),
    User.create({
      _id: new mongoose.Types.ObjectId(),
      username: 'test',
      email: faker.internet.email(),
      role: 'Master administrator',
      password: 'test',
      links: [],
    }),
  ];

  await Promise
    .all(deleteAll)
    .then(() => {
      logger.log('Deleted all records in DB', 'info', true);
    })
    .catch((error) => {
      logger.log(error, 'error');
    });

  await Promise
    .all(createalll)
    .then(() => {
      logger.log('Seeded DB', 'info', true);
    })
    .catch((error) => {
      logger.log(error, 'error');
    });
};
