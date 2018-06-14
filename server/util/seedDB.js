import faker from 'faker';
import seeddebug from 'debug';
import Person from '../api/person/personModel';
import Job from '../api/job/jobModel';
import Wallet from '../api/wallet/walletModel';
import Work from '../api/work/workModel';

const debug = seeddebug('server:seedDatabase');

const jobs = [];
const wallets = [];
const works = [];

const people = [];


for (let index = 0; index < 20; index += 1) {
  const jobSeed = {
    JobTitle: faker.name.jobTitle(),
    Description: faker.name.jobDescriptor(),
    Permissions: 'Empty',
  };

  const walletSeed = {
    TotalEarned: faker.finance.amount(),
    Pay: faker.finance.amount(),
    LastMonthPay: faker.finance.amount(),
    ThisMonthPay: faker.finance.amount(),
  };

  const workSeed = {
    StartDate: faker.date.past(),
    EndDate: faker.date.future(),
    WorkHoursThisYear: faker.random.number(),
    TotalHours: faker.random.number(),
  };

  const person = {
    FirstName: faker.name.firstName(),
    LastName: faker.name.lastName(),
    Birthday: faker.date.past(),
  };

  jobs.push(jobSeed);
  wallets.push(walletSeed);
  works.push(workSeed);
  people.push(person);
}

export default async function () {
  try {
    await Person.remove();
    await Job.remove();
    await Wallet.remove();
    await Work.remove();


    const personDocuments = await Person.create(people);

    for (let i = 0; i < people.length; i += 1) {
      jobs[i]._Owner = personDocuments[i]._id;
      works[i]._Owner = personDocuments[i]._id;
      wallets[i]._Owner = personDocuments[i]._id;
    }


    await Job.create(jobs);
    await Wallet.create(wallets);
    await Work.create(works);

    debug('Removed and seeded DB');
  } catch (error) {
    debug(error);
  }
}