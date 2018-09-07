const chai = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const dirtyChai = require('dirty-chai');
const Schedule = require('../scheduleModel');
const {
  getAllSchedules,
  getScheduleById,
  createSchedule,
  updateScheduleById,
  deleteScheduleById,
} = require('../scheduleController');

const { expect } = chai;

chai.use(chaiAsPromised);
chai.use(dirtyChai);

describe('Schedule Controller Unit Tests', () => {
  describe('getAllSchedules', () => {
    before(() => {
      sinon.stub(Schedule, 'find').callsFake((conditions) => {
        const db = [{
          _id: '123',
          _Owner: '1234',
          start: '1964-07-12',
          end: '1964-07-12',
          holiday: true,
          weekend: true,
          links: [],
          setupHyperLinks: () => null,
        }];
        return db.filter(schedueles => schedueles._Owner === conditions._Owner);
      });
    });
    context('successfully found schedules', () => {
      it('should return a promise that eventually resolves to an object with property result', async () => {
        await expect(getAllSchedules('1234', '', ''))
          .to.be.a('promise')
          .that.is.eventually.fulfilled()
          .to.an('object')
          .with.property('result');
      });
      it('result object should contain property count and schedules', async () => {
        await expect(getAllSchedules('1234', '', ''))
          .to.eventually.be.an('object')
          .that.has.property('result')
          .with.keys('schedules', 'count');
      });
      it('schedules property should be an array of schedule objects', async () => {
        await expect(getAllSchedules('1234', '', ''))
          .to.eventually.be.an('object')
          .with.nested.property('result.schedules')
          .that.is.an('array')
          .with.property('[0]')
          .that.is.an('object')
          .with.property('start');
      });
    });
    context('found no schedules', () => {
      it('should return an object with status property of value 204 and result property of value null', async () => {
        await expect(getAllSchedules('123', '', ''))
          .to.eventually.be.an('object')
          .with.keys('status', 'result')
          .to.deep.equal({ status: 204, result: null });
      });
    });
    after(() => {
      Schedule.find.restore();
    });
  });
  describe('getScheduleById', () => {
    before(() => {
      sinon.stub(Schedule, 'findOne').callsFake((conditions) => {
        const db = [{
          _id: '123',
          _Owner: '1234',
          start: '1964-07-12',
          end: '1964-07-12',
          holiday: true,
          weekend: true,
          links: [],
          setupHyperLinks: () => null,
        }];
        return Promise.resolve(db.filter(schedueles => schedueles._id === conditions._id)[0]);
      });
    });
    context('successfully found schedule', () => {
      it('should return a promise that eventually resolves to an object with property result', async () => {
        await expect(getScheduleById('123', '', ''))
          .to.be.a('promise')
          .that.is.eventually.fulfilled()
          .to.an('object')
          .with.property('result');
      });
      it('result property should be a schedule object', async () => {
        await expect(getScheduleById('123', '', ''))
          .to.eventually.have.property('result')
          .that.is.an('object')
          .with.property('start');
      });
    });
    context('found no schedule', () => {
      it('should return an object with status property of value 204 and result property of value null', async () => {
        await expect(getScheduleById('1234', '', ''))
          .to.eventually.be.an('object')
          .with.keys('status', 'result')
          .to.deep.equal({ status: 204, result: null });
      });
    });
    after(() => {
      Schedule.findOne.restore();
    });
  });
  describe('createSchedule', () => {
    context('successfully create schedule', () => {
      before(() => {
        sinon.stub(Schedule, 'create').callsFake((schedule) => {
          const newSchedule = schedule;
          newSchedule.setupHyperLinks = () => null;
          return newSchedule;
        });
      });
      it('should return a promise that resolves to an object', async () => {
        const scheduleToCreate = {
          start: '',
          end: '',
          holiday: '',
          weekend: '',
        };
        await expect(createSchedule(scheduleToCreate, '1234', '', ''))
          .to.be.a('promise')
          .that.is.eventually.fulfilled()
          .to.an('object');
      });
      it('returned object should have status property with the value 201 and a result property', async () => {
        const scheduleToCreate = {
          start: '',
          end: '',
          holiday: '',
          weekend: '',
        };
        await expect(createSchedule(scheduleToCreate, '1234', '', ''))
          .to.eventually.be.an('object')
          .with.keys('status', 'result')
          .and.property('status').that.equals(201);
      });
      it('should return an employee object', async () => {
        const scheduleToCreate = {
          start: '',
          end: '',
          holiday: '',
          weekend: '',
        };
        await expect(createSchedule(scheduleToCreate, '1234'))
          .to.eventually.have.property('result')
          .that.is.an('object')
          .with.property('start');
      });
      after(() => {
        Schedule.create.restore();
      });
    });
    context('unsuccessfully create schedule', () => {
      before(() => {
        sinon.stub(Schedule, 'create').rejects();
      });
      it('should throw an error', () => {
        const scheduleToCreate = {
          start: '',
          end: '',
          holiday: '',
          weekend: '',
        };
        expect(createSchedule(scheduleToCreate, '1234')).to.eventually.be.rejected();
      });
      after(() => {
        Schedule.create.restore();
      });
    });
  });
  describe('updateScheduleById', () => {
    context('successfully updated schedule', () => {
      before(() => {
        sinon.stub(Schedule, 'findOneAndUpdate').callsFake((obj, schedule) => {
          const newSchedule = schedule.$set;
          newSchedule.setupHyperLinks = () => null;
          return newSchedule;
        });
      });
      it('should return a promise that resolves to an object', async () => {
        const scheduleToCreate = {
          start: '',
          end: '',
          holiday: '',
          weekend: '',
        };
        await expect(updateScheduleById(scheduleToCreate, '123', '', ''))
          .to.be.a('promise')
          .that.is.eventually.fulfilled()
          .to.an('object');
      });
      it('returned object should have result property', async () => {
        const scheduleToCreate = {
          start: '',
          end: '',
          holiday: '',
          weekend: '',
        };
        await expect(updateScheduleById(scheduleToCreate, '123', '', ''))
          .to.eventually.have.property('result')
          .that.is.an('object');
      });
      it('result property should be a schedule object', async () => {
        const scheduleToCreate = {
          start: '',
          end: '',
          holiday: '',
          weekend: '',
        };
        await expect(updateScheduleById(scheduleToCreate, '123', '', ''))
          .to.eventually.have.property('result')
          .that.has.property('start');
      });
      after(() => {
        Schedule.findOneAndUpdate.restore();
      });
    });
    context('unsuccessfully updated schedule', () => {
      before(() => {
        sinon.stub(Schedule, 'findOneAndUpdate').rejects();
      });
      it('should throw an error', () => {
        const scheduleToCreate = {
          start: '',
          end: '',
          holiday: '',
          weekend: '',
        };
        expect(updateScheduleById(scheduleToCreate, '123', '', '')).to.eventually.be.rejected();
      });
      after(() => {
        Schedule.findOneAndUpdate.restore();
      });
    });
  });
  describe('deleteScheduleById', () => {
    context('successfully deleted schedule', () => {
      before(() => {
        sinon.stub(Schedule, 'findOneAndRemove').resolves();
      });
      it('should return a promise that resolves to an object', async () => {
        await expect(deleteScheduleById('123'))
          .to.be.a('promise')
          .that.is.eventually.fulfilled()
          .to.an('object');
      });
      it('returned object should have result property', async () => {
        await expect(deleteScheduleById('123'))
          .to.eventually.have.property('result')
          .that.is.a('string');
      });
      it('result properly should be a message', async () => {
        await expect(deleteScheduleById('123'))
          .to.eventually.have.property('result')
          .that.equals('Successfully deleted schedule');
      });
      after(() => {
        Schedule.findOneAndRemove.restore();
      });
    });
    context('unsuccessfully deleted schedule', () => {
      before(() => {
        sinon.stub(Schedule, 'findOneAndRemove').rejects();
      });
      it('should throw an error', () => {
        expect(deleteScheduleById('123')).to.be.rejected();
      });
      after(() => {
        Schedule.findOneAndRemove.restore();
      });
    });
  });
});
