const chai = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const dirtyChai = require('dirty-chai');
const Schedule = require('../scheduleModel');
const {
  createSchedule,
  createScheduleObject,
  findAndDeleteScheduleById,
  findScheduleById,
  findScheduleByOwner,
  findAndUpdateScheduleById,
} = require('../scheduleService');

const { expect } = chai;

chai.use(chaiAsPromised);
chai.use(dirtyChai);

describe('Schedule Service Unit Tests', () => {
  describe('createSchedule', () => {
    before(() => {
      sinon.stub(Schedule, 'create').resolves({
        _id: '123',
        _Owner: '1234',
        start: '1964-07-12',
        end: '1964-07-12',
        holiday: true,
        weekend: true,
        links: [],
        setupHyperLinks: () => null,
      });
    });
    it('should return a promise that eventually resolves to a schedule object', async () => {
      const objToCreate = {
        _id: '123',
        _Owner: '1234',
        start: '1964-07-12',
        end: '1964-07-12',
        holiday: true,
        weekend: true,
        links: [],
        setupHyperLinks: () => null,
      };

      await expect(createSchedule(objToCreate))
        .to.be.a('promise')
        .that.is.eventually.fulfilled()
        .to.an('object')
        .with.property('start');
    });
    it('should throw if called with an array', () => {
      expect(createSchedule(['key'])).to.eventually.be.rejectedWith('array is not an object');
    });
    it('should throw if not called with an object', () => {
      expect(createSchedule('1234')).to.eventually.be.rejectedWith('string is not an object');
    });
    after(() => {
      Schedule.create.restore();
    });
  });
  describe('createScheduleObject', () => {
    it('should return an employee template object', () => {
      const objToCreate = {
        start: '1964-07-12',
        end: '1964-07-12',
        holiday: true,
        weekend: true,
        links: [],
      };
      const result = createScheduleObject(objToCreate, '123');
      expect(result).to.be.an('object').with.property('_Owner');
    });
    it('should throw if obj arguement isnt an object', () => {
      try {
        createScheduleObject('123', '123');
      } catch (error) {
        expect(error).to.not.be.null();
        expect(error.message).to.be.equal('string is not an object');
      }
    });
    it('should throw if obj arguement is an array', () => {
      try {
        createScheduleObject([], '123');
      } catch (error) {
        expect(error).to.not.be.null();
        expect(error.message).to.be.equal('array is not an object');
      }
    });
    it('should throw if id arguement is not a string', () => {
      try {
        createScheduleObject({}, 123);
      } catch (error) {
        expect(error).to.not.be.null();
        expect(error.message).to.be.equal('number is not a string');
      }
    });
  });
  describe('findAndDeleteScheduleById', () => {
    before(() => {
      sinon.stub(Schedule, 'findOneAndRemove').resolves({
        _id: '123',
        _Owner: '1234',
        start: '1964-07-12',
        end: '1964-07-12',
        holiday: true,
        weekend: true,
        links: [],
        setupHyperLinks: () => null,
      });
    });
    it('should return a promise that eventually resolves to an object', async () => {
      await expect(findAndDeleteScheduleById('123'))
        .to.be.a('promise')
        .that.is.eventually.fulfilled()
        .to.an('object');
    });
    it('should resolve to a schedule object', async () => {
      await expect(findAndDeleteScheduleById('123'))
        .to.eventually.have.property('start');
    });
    it('should throw if id arguement is not a string', () => {
      expect(findAndDeleteScheduleById(1234)).to.eventually.be.rejectedWith('number is not a string');
    });
    after(() => {
      Schedule.findOneAndRemove.restore();
    });
  });
  describe('findScheduleById', () => {
    before(() => {
      sinon.stub(Schedule, 'findOne').resolves({
        _id: '123',
        _Owner: '1234',
        start: '1964-07-12',
        end: '1964-07-12',
        holiday: true,
        weekend: true,
        links: [],
        setupHyperLinks: () => null,
      });
    });
    it('should return a promise that eventually resolves to a schedule object', async () => {
      await expect(findScheduleById('123'))
        .to.be.a('promise')
        .that.is.eventually.fulfilled()
        .to.an('object').with.property('start');
    });
    it('should throw if id arguement is not a string', () => {
      expect(findScheduleById(123)).to.eventually.be.rejectedWith('number is not a string');
    });
    after(() => {
      Schedule.findOne.restore();
    });
  });
  describe('findScheduleByOwner', () => {
    before(() => {
      sinon.stub(Schedule, 'find').resolves([{
        _id: '123',
        _Owner: '1234',
        start: '1964-07-12',
        end: '1964-07-12',
        holiday: true,
        weekend: true,
        links: [],
        setupHyperLinks: () => null,
      }]);
    });
    it('should return a promise that eventually resolves to an array of schedule objects', async () => {
      await expect(findScheduleByOwner('123'))
        .to.be.a('promise')
        .that.is.eventually.fulfilled()
        .to.an('array').that.has.nested.property('[0].start');
    });
    it('should throw if ownerId arguement is not a string', () => {
      expect(findScheduleByOwner(123)).to.be.rejectedWith('number is not a string');
    });
    after(() => {
      Schedule.find.restore();
    });
  });
  describe('findAndUpdateScheduleById', () => {
    before(() => {
      sinon.stub(Schedule, 'findOneAndUpdate').resolves({
        _id: '123',
        _Owner: '1234',
        start: '1964-07-12',
        end: '1964-07-12',
        holiday: true,
        weekend: true,
        links: [],
        setupHyperLinks: () => null,
      });
    });
    it('should return a promise that eventually resolves to a schedule object', async () => {
      await expect(findAndUpdateScheduleById({ key: 'value' }, '123'))
        .to.be.a('promise')
        .that.is.eventually.fulfilled().to.an('object');
    });
    it('should throw if  obj arguement is an array', () => {
      expect(findAndUpdateScheduleById(['key'], '123')).to.eventually.be.rejectedWith('array is not an object');
    });
    it('should throw if obj arguement is not an object', () => {
      expect(findAndUpdateScheduleById('key', '123')).to.eventually.be.rejectedWith('string is not an object');
    });
    it('should throw if id arguement is not a string', () => {
      expect(findAndUpdateScheduleById({ key: 'value' }, 123)).to.eventually.be.rejectedWith('number is not a string');
    });
    after(() => {
      Schedule.findOneAndUpdate.restore();
    });
  });
});
