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
      it('should return a promise that eventually resolves to an object with property result', () => {
        const getAllSchedulesPromise = getAllSchedules('1234', '', '');
        expect(getAllSchedulesPromise).to.be.a('promise');
        expect(getAllSchedulesPromise).to.eventually.be.fulfilled();
        expect(getAllSchedulesPromise).to.eventually.be.an('object');
        expect(getAllSchedulesPromise).to.eventually.have.property('result');
      });
      it('result object should contain property count and schedules', async () => {
        const result = await getAllSchedules('1234', '', '');
        expect(result.result).to.have.property('count');
        expect(result.result).to.have.property('schedules');
      });
      it('schedules property should be an array of schedule objects', async () => {
        const result = await getAllSchedules('1234', '', '');
        expect(result.result.schedules).to.be.an('array');
        expect(result.result.schedules[0]).to.be.an('object');
        expect(result.result.schedules[0]).to.have.property('start');
      });
    });
    context('found no schedules', () => {
      it('should return an object with status property of value 204 and result property of value null', async () => {
        const result = await getAllSchedules('123', '', '');
        expect(result).to.be.an('object');
        expect(result.status).to.be.equal(204);
        expect(result.result).to.be.null();
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
        return db.filter(schedueles => schedueles._id === conditions._id)[0];
      });
    });
    context('successfully found schedule', () => {
      it('should return a promise that eventually resolves to an object with property result', () => {
        const getScheduleByIdPromise = getScheduleById('123', '', '');
        expect(getScheduleByIdPromise).to.be.a('promise');
        expect(getScheduleByIdPromise).to.eventually.be.fulfilled();
        expect(getScheduleByIdPromise).to.eventually.be.an('object');
        expect(getScheduleByIdPromise).to.eventually.have.property('result');
      });
      it('result property should be a schedule object', async () => {
        const result = await getScheduleById('123', '', '');
        expect(result.result).to.be.an('object');
        expect(result.result).to.have.property('start');
      });
    });
    context('found no schedule', () => {
      it('should return an object with status property of value 204 and result property of value null', async () => {
        const result = await getScheduleById('1234', '', '');
        expect(result).to.be.an('object');
        expect(result.status).to.be.equal(204);
        expect(result.result).to.be.null();
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
      it('should return a promise that resolves to an object', () => {
        const scheduleToCreate = {
          start: '',
          end: '',
          holiday: '',
          weekend: '',
        };
        const createSchedulePromise = createSchedule(scheduleToCreate, '1234', '', '');
        expect(createSchedulePromise).to.be.a('promise');
        expect(createSchedulePromise).to.eventually.be.fulfilled();
        expect(createSchedulePromise).to.eventually.be.an('object');
      });
      it('returned object should have status property with the value 201 and a result property', async () => {
        const scheduleToCreate = {
          start: '',
          end: '',
          holiday: '',
          weekend: '',
        };
        const result = await createSchedule(scheduleToCreate, '1234', '', '');
        expect(result).to.be.an('object');
        expect(result).to.have.property('status');
        expect(result).to.have.property('result');
        expect(result.status).to.be.equal(201);
      });
      it('should return an employee object', async () => {
        const scheduleToCreate = {
          start: '',
          end: '',
          holiday: '',
          weekend: '',
        };
        const result = await createSchedule(scheduleToCreate, '1234');
        expect(result.result).to.be.an('object');
        expect(result.result).to.have.property('start');
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
      it('should return a promise that resolves to an object', () => {
        const scheduleToCreate = {
          start: '',
          end: '',
          holiday: '',
          weekend: '',
        };
        const updateScheduleByIdPromise = updateScheduleById(scheduleToCreate, '123', '', '');
        expect(updateScheduleByIdPromise).to.be.a('promise');
        expect(updateScheduleByIdPromise).to.eventually.be.fulfilled();
        expect(updateScheduleByIdPromise).to.eventually.be.an('object');
      });
      it('returned object should have result property', async () => {
        const scheduleToCreate = {
          start: '',
          end: '',
          holiday: '',
          weekend: '',
        };
        const result = await updateScheduleById(scheduleToCreate, '123', '', '');
        expect(result).to.have.property('result');
        expect(result.result).to.be.an('object');
      });
      it('result property should be a schedule object', async () => {
        const scheduleToCreate = {
          start: '',
          end: '',
          holiday: '',
          weekend: '',
        };
        const result = await updateScheduleById(scheduleToCreate, '123', '', '');
        expect(result.result).to.have.property('start');
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
      it('should return a promise that resolves to an object', () => {
        const deleteScheduleByIdPromise = deleteScheduleById('123');
        expect(deleteScheduleByIdPromise).to.be.a('promise');
        expect(deleteScheduleByIdPromise).to.eventually.be.fulfilled();
        expect(deleteScheduleByIdPromise).to.eventually.be.a('object');
      });
      it('returned object should have result property', async () => {
        const result = await deleteScheduleById('123');
        expect(result).to.have.property('result');
        expect(result.result).to.be.a('string');
      });
      it('result properly should be a message', async () => {
        const result = await deleteScheduleById('123');
        expect(result.result).to.be.equal('Successfully deleted schedule');
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
