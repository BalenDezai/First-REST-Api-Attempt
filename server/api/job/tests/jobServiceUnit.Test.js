const chai = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const dirtyChai = require('dirty-chai');
const Job = require('../jobModel');
const { findJobByOwnerAndUpdate, findJobByOwner } = require('../jobService');

const { expect } = chai;

chai.use(chaiAsPromised);
chai.use(dirtyChai);

describe('employeeService Unit Tests', () => {
  describe('findJobByOwner', () => {
    before(() => {
      sinon.stub(Job, 'findOne').resolves({
        _id: '123',
        jobTitle: '',
        description: '',
        _Owner: '1234',
        setupHyperLinks: () => null,
      });
    });
    it('should return a promise that eventually resolves to an object', () => {
      const id = '123';
      const findJobByOwnerPromise = findJobByOwner(id);
      expect(findJobByOwnerPromise).to.be.a('promise');
      expect(findJobByOwnerPromise).to.eventually.be.fulfilled();
      expect(findJobByOwnerPromise).to.eventually.be.an('object');
    });
    it('should resolve to a job object', () => {
      const id = '123';
      const findJobByOwnerPromise = findJobByOwner(id);
      expect(findJobByOwnerPromise).to.eventually.have.property('_id');
      expect(findJobByOwnerPromise).to.eventually.have.property('jobTitle');
    });
    it('should throw if ownerId arguement is not a string', () => {
      const id = { id: '123' };
      expect(findJobByOwner(id)).to.be.rejectedWith(`${typeof id} is not a string`);
    });
    after(() => {
      Job.findOne.restore();
    });
  });
  describe('findJobByOwnerAndUpdate', () => {
    before(() => {
      sinon.stub(Job, 'findOneAndUpdate').callsFake((id, obj) => {
        const newObj = obj.$set;
        newObj._id = '1234';
        newObj.SetUpHyperLinks = () => null;
        return newObj;
      });
    });
    it('should return a promise that eventually resolves to an object', () => {
      const toUpdate = {
        jobTitle: '',
        description: '',
        _Owner: '1234',
      };
      const findJobByOwnerAndUpdatePromise = findJobByOwnerAndUpdate('123', toUpdate);
      expect(findJobByOwnerAndUpdatePromise).to.be.a('promise');
      expect(findJobByOwnerAndUpdatePromise).to.eventually.be.fulfilled();
      expect(findJobByOwnerAndUpdatePromise).to.eventually.be.an('object');
    });
    it('should resolve to a job object', async () => {
      const toUpdate = {
        jobTitle: '',
        description: '',
        _Owner: '1234',
      };
      const updatedJob = await findJobByOwnerAndUpdate('123', toUpdate);
      expect(updatedJob).to.be.an('object');
      expect(updatedJob).to.have.property('_id');
      expect(updatedJob).to.have.property('jobTitle');
    });
    it('should throw if ownerId arguement isnt a string', () => {
      const ownerId = 123;
      const toUpdate = {
        jobTitle: '',
        description: '',
        _Owner: '1234',
      };
      expect(findJobByOwnerAndUpdate(ownerId, toUpdate)).to.be.rejectedWith(`${typeof ownerId} is not a string`);
    });
    it('should throw if obj arguement is an array', () => {
      const ownerId = '123';
      const toUpdate = [{
        jobTitle: '',
        description: '',
        _Owner: '1234',
      }];
      expect(findJobByOwnerAndUpdate(ownerId, toUpdate)).to.be.rejectedWith('array is not an object');
    });
    it('should throw if obj arguement is not an object', () => {
      const ownerId = '123';
      const toUpdate = 'sdfsdfsdfsdf';
      expect(findJobByOwnerAndUpdate(ownerId, toUpdate)).to.be.rejectedWith(`${typeof toUpdate} is not an object`);
    });
    after(() => {
      Job.findOneAndUpdate.restore();
    });
  });
});
