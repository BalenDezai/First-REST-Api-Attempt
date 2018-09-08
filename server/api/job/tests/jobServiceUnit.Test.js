const chai = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const dirtyChai = require('dirty-chai');
const Job = require('../jobModel');
const { findJobByOwnerAndUpdate, findJobByOwner } = require('../jobService');

const { expect } = chai;

chai.use(chaiAsPromised);
chai.use(dirtyChai);

describe('Job Service Unit Tests', () => {
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
    it('should return a promise that eventually resolves to an object', async () => {
      const id = '123';
      await expect(findJobByOwner(id))
        .to.be.a('promise')
        .that.is.eventually.fulfilled()
        .to.an('object');
    });
    it('should resolve to a job object', async () => {
      const id = '123';
      await expect(findJobByOwner(id))
        .to.eventually.have.any.keys('_id', 'jobTitle');
    });
    it('should throw if ownerId arguement is not a string', async () => {
      const id = { id: '123' };
      await expect(findJobByOwner(id))
        .to.be.rejectedWith(`${typeof id} is not a string`);
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
    it('should return a promise that eventually resolves to an object', async () => {
      const toUpdate = {
        jobTitle: '',
        description: '',
        _Owner: '1234',
      };
      await expect(findJobByOwnerAndUpdate('123', toUpdate))
        .to.be.a('promise')
        .that.is.eventually.fulfilled()
        .to.an('object');
    });
    it('should resolve to a job object', async () => {
      const toUpdate = {
        jobTitle: '',
        description: '',
        _Owner: '1234',
      };
      await expect(findJobByOwnerAndUpdate('123', toUpdate))
        .to.eventually.be.an('object').with.any.keys('_id', 'jobTitle');
    });
    it('should throw if ownerId arguement isnt a string', async () => {
      const ownerId = 123;
      const toUpdate = {
        jobTitle: '',
        description: '',
        _Owner: '1234',
      };
      await expect(findJobByOwnerAndUpdate(ownerId, toUpdate))
        .to.be.rejectedWith(`${typeof ownerId} is not a string`);
    });
    it('should throw if obj arguement is an array', async () => {
      const ownerId = '123';
      const toUpdate = [{
        jobTitle: '',
        description: '',
        _Owner: '1234',
      }];
      await expect(findJobByOwnerAndUpdate(ownerId, toUpdate))
        .to.be.rejectedWith('array is not an object');
    });
    it('should throw if obj arguement is not an object', async () => {
      const ownerId = '123';
      const toUpdate = 'sdfsdfsdfsdf';
      await expect(findJobByOwnerAndUpdate(ownerId, toUpdate))
        .to.be.rejectedWith(`${typeof toUpdate} is not an object`);
    });
    after(() => {
      Job.findOneAndUpdate.restore();
    });
  });
});
