const chai = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const dirtyChai = require('dirty-chai');
const Job = require('../jobModel');
const { updateJobByOwnerId, getJobByOwnerId } = require('../jobController');

const { expect } = chai;

chai.use(chaiAsPromised);
chai.use(dirtyChai);

describe('Job Controller Unit Tests', () => {
  describe('getJobByOwnerId', () => {
    before(() => {
      sinon.stub(Job, 'findOne').callsFake((conditions) => {
        const db = [{
          _id: '123',
          jobTitle: '',
          description: '',
          _Owner: '1234',
          setupHyperLinks: () => null,
        }];
        const foundJob = db.filter(job => job._Owner === conditions._Owner)[0];
        return Promise.resolve(foundJob);
      });
    });
    it('should return a promise that eventually resolves to an object', () => {
      const ownerId = '1234';
      const getJobByOwnerPromise = getJobByOwnerId(ownerId, '', '');
      expect(getJobByOwnerPromise).to.be.a('promise');
      expect(getJobByOwnerPromise).to.eventually.be.fulfilled();
      expect(getJobByOwnerPromise).to.eventually.be.an('object');
    });
    it('should return an employee object', async () => {
      const ownerId = '1234';
      const foundJob = await getJobByOwnerId(ownerId, '', '');
      expect(foundJob.result).to.be.an('object');
      expect(foundJob.result).to.have.property('_id');
    });
    after(() => {
      Job.findOne.restore();
    });
  });
  describe('updateJobByOwnerId', () => {
    before(() => {
      sinon.stub(Job, 'findOneAndUpdate').callsFake((id, obj) => {
        const newObj = obj.$set;
        newObj._id = '1234';
        newObj.SetUpHyperLinks = () => null;
        return newObj;
      });
    });
    it('should update a promise that eventually resolves to an object', () => {
      const updatedJob = {
        _id: '123',
        jobTitle: '',
        description: '',
        _Owner: '1234',
        setupHyperLinks: () => null,
      };
      const updateJobByOwnerIdPromise = updateJobByOwnerId(updatedJob, '1234', '', '');
      expect(updateJobByOwnerIdPromise).to.be.a('promise');
      expect(updateJobByOwnerIdPromise).to.eventually.be.fulfilled();
      expect(updateJobByOwnerIdPromise).to.eventually.be.an('object');
    });
    it('should return an employee object', async () => {
      const jobToUpdate = {
        _id: '123',
        jobTitle: '',
        description: '',
        _Owner: '1234',
        setupHyperLinks: () => null,
      };
      const updatedJob = await updateJobByOwnerId(jobToUpdate, '1234', '', '');
      expect(updatedJob.result).to.be.an('object');
      expect(updatedJob.result).to.have.property('_id');
    });
    after(() => {
      Job.findOneAndUpdate.restore();
    });
  });
});
