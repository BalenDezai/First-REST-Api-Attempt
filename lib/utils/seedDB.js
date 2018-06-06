import Person from '../../models/person';
import Job from '../../models/job';
import Wallet from '../../models/wallet';
import Work from '../../models/work';
import faker from 'faker';
import seeddebug from 'debug';
import job from '../../models/job';
import wallet from '../../models/wallet';
import work from '../../models/work';

const debug = seeddebug('seed');

const jobs = [];
const wallets = [];
const works = [];

const people = [];


for (let index = 0; index < 20; index++) {
  const job = {
    JobTitle: faker.name.jobTitle(),
    Description: faker.name.jobDescriptor(),
    Permissions: "Empty"
  }

  const wallet = {
    TotalEarned: faker.finance.amount(),
    Pay: faker.finance.amount(),
    LastMonthPay: faker.finance.amount(),
    ThisMonthPay: faker.finance.amount()
  }

  const work = {
    StartDate: faker.date.past(),
    EndDate: faker.date.future(),
    WorkHoursThisYear: faker.random.number(),
    TotalHours: faker.random.number()
  }

  const person = {
    FirstName: faker.name.firstName(),
    LastName: faker.name.lastName(),
    Birthday: faker.date.past(),

  }

  jobs.push(job);
  wallets.push(wallet);
  works.push(work);
  people.push(person);
}

export default async function () {
  try {
    await Person.remove();
    await job.remove();
    await wallet.remove();
    await work.remove();


    const jobDocuments = await Job.create(jobs);
    const walletDocuments = await Wallet.create(wallets);
    const workDocuments = await Work.create(works);


    for (let i = 0; i < people.length; i++) {
      people[i]._Job = jobDocuments[i]._id;
      people[i]._Wallet = walletDocuments[i]._id;
      people[i]._Work = workDocuments[i]._id
      await Person.create(people[i]);

    }

    debug("Removed and seeded DB");
  } catch (error) {
    debug(error);

  }
}