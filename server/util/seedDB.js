import faker from 'faker';
import seeddebug from 'debug';
import mongoose from 'mongoose';
import Employee from '../api/employee/employeeModel';
import Job from '../api/job/jobModel';
import Wallet from '../api/wallet/walletModel';
import Work from '../api/work/workModel';
import Schedule from '../api/schedule/scheduleModel';
import hateaosGen from './HyperMediaLinksGenerator';


const debug = seeddebug('app:seedDatabase');

const employees = [];
const jobs = [];
const schedules = [];
const wallets = [];
const works = [];


for (let index = 0; index < 20; index += 1) {

  const employee = {
    _id: mongoose.Types.ObjectId(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    Birthday: faker.date.past(),
    city: faker.address.city(),
    country: faker.address.country(),
    street: faker.address.streetAddress(),
    phoneNumber: faker.phone.phoneNumber(),
    startDate: faker.date.past(),
    lastChanged: faker.date.past(),
    links: [],
  };
  //  TODO: fix this and set it up
  const employeeEndPoinst = ['self', 'wallet', 'schedule', 'workhours', 'job'];
  hateaosGen(employee, 'localhost:3000/', 'api/v1/employee', employeeEndPoinst);

  const job = {
    _id: mongoose.Types.ObjectId(),
    JobTitle: faker.name.jobTitle(),
    Description: faker.name.jobDescriptor(),
    _Owner: employee._id,
    Permissions: faker.random.arrayElement(['Create', 'Read', 'Update', 'Delete']),
    links: [],
  };

  const jobEndPoinst = ['self'];
  hateaosGen(employee, 'localhost:3000/', `api/v1/employee/${employee._id}/job`, jobEndPoinst);

  const schedule = {
    _id: mongoose.Types.ObjectId(),
    employee_id: employee._id,
    work_date: faker.date.future(),
    start_work_hour: faker.date.future(),
    end_work_hour: faker.date.future(),
    is_holiday: faker.random.boolean(),
    is_weekend: faker.random.boolean(),
    links: [],
  };

  const scheduleEndPoinst = ['self'];
  hateaosGen(schedule, 'localhost:3000/', `api/v1/employee/${employee._id}/schedule`, scheduleEndPoinst);

  const wallet = {
    _id: mongoose.Types.ObjectId(),
    wage: faker.finance.amount(),
    salary: faker.finance.amount(),
    paymentMethod: faker.random.arrayElement(['Monthly', 'Hourly']),
    _Owner: employee._id,
    lastChanged: faker.date.past(),
    links: [],
  };

  const walletEndPoinst = ['self'];
  hateaosGen(wallet, 'localhost:3000/', `api/v1/employee/${employee._id}/wallet`, walletEndPoinst);

  const work = {
    _id: mongoose.Types.ObjectId(),
    work_start_date: faker.date.past(),
    work_end_date: faker.date.future(),
    work_hours_this_tear: faker.finance.amount(),
    TotalHours: faker.finance.amount(),
    _Owner: employee._id,
    links: [],
  };

  const workEndPoinst = ['self'];
  hateaosGen(work, 'localhost:3000/', `api/v1/employee/${employee._id}/work`, workEndPoinst);


  employees.push(employee);
  jobs.push(job);
  schedules.push(schedule);
  wallets.push(wallet);
  works.push(work);
}

export default async function () {
  try {
    await Employee.remove();
    await Job.remove();
    await Schedule.remove();
    await Wallet.remove();
    await Work.remove();

    await Employee.create(employees);
    await Job.create(jobs);
    await Schedule.create(schedules);
    await Wallet.create(wallets);
    await Work.create(works);

    debug('Removed and seeded DB');
  } catch (error) {
    debug(error);
  }
}
