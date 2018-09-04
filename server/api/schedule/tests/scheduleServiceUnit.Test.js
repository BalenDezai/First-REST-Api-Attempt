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
    it('should return a promise that eventually resolves to an object', () => {
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

      const createSchedulePromise = createSchedule(objToCreate);
      expect(createSchedulePromise).to.be.a('promise');
      expect(createSchedulePromise).to.eventually.be.fulfilled();
      expect(createSchedulePromise).to.eventually.be.an('object');
    });
    it('should resolve to a schedule object', () => {
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

      expect(createSchedule(objToCreate)).to.eventually.have.property('start');
    });
    it('should throw if called with an array', () => {
      const objToCreate = [{
        _id: '123',
        _Owner: '1234',
        start: '1964-07-12',
        end: '1964-07-12',
        holiday: true,
        weekend: true,
        links: [],
        setupHyperLinks: () => null,
      }];

      expect(createSchedule(objToCreate)).to.eventually.be.rejectedWith('array is not an object');
    });
    it('should throw if not called with an object', () => {
      const objToCreate = '1234';

      expect(createSchedule(objToCreate)).to.eventually.be.rejectedWith(`${typeof objToCreate} is not an object`);
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
      expect(result).to.be.an('object');
      expect(result).to.have.property('_Owner');
    });
    it('should throw if obj arguement isnt an object', () => {
      try {
        createScheduleObject('123', '123');
      } catch (error) {
        expect(error).to.not.be.null();
        expect(error.message).to.be.equal('string is not an object');
      }
    });
    //  TODO: continue this
    it('should throw if obj arguement is an array', () => {

    });
  });
  describe('findAndDeleteScheduleById', () => {
    before(() => {

    });
    it('', () => {

    });
    it('', () => {

    });
    it('', () => {

    });
    after(() => {

    });
  });
  describe('findScheduleById', () => {
    before(() => {

    });
    it('', () => {

    });
    it('', () => {

    });
    it('', () => {

    });
    after(() => {

    });
  });
  describe('findScheduleByOwner', () => {
    before(() => {

    });
    it('', () => {

    });
    it('', () => {

    });
    it('', () => {

    });
    after(() => {

    });
  });
  describe('findAndUpdateScheduleById', () => {
    before(() => {

    });
    it('', () => {

    });
    it('', () => {

    });
    it('', () => {

    });
    after(() => {

    });
  });
});
