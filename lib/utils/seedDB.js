import faker from 'faker';
import seeddebug from 'debug';
import Person from '../../models/person';
import Job from '../../models/job';
import Wallet from '../../models/wallet';
import Work from '../../models/work';

const debug = seeddebug('seed');

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


    const jobDocuments = await Job.create(jobs);
    const walletDocuments = await Wallet.create(wallets);
    const workDocuments = await Work.create(works);


    for (let i = 0; i < people.length; i += 1) {
      people[i]._Job = jobDocuments[i]._id;
      people[i]._Wallet = walletDocuments[i]._id;
      people[i]._Work = workDocuments[i]._id;
    }

    await Person.create(people);

    debug('Removed and seeded DB');
  } catch (error) {
    debug(error);
  }
}