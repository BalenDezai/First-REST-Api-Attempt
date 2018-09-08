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
    it('should return a promise that eventually resolves to an object', async () => {
      const ownerId = '1234';
      await expect(getJobByOwnerId(ownerId, '', ''))
        .to.be.a('promise')
        .that.is.eventually.fulfilled()
        .to.an('object');
    });
    it('should return an employee object', async () => {
      const ownerId = '1234';
      await expect(getJobByOwnerId(ownerId, '', ''))
        .to.eventually.have.property('result')
        .that.is.an('object').with.property('_id');
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
    it('should update a promise that eventually resolves to an object', async () => {
      const updatedJob = {
        _id: '123',
        jobTitle: '',
        description: '',
        _Owner: '1234',
        setupHyperLinks: () => null,
      };
      await expect(updateJobByOwnerId(updatedJob, '1234', '', ''))
        .to.be.a('promise')
        .that.is.eventually.fulfilled()
        .to.an('object');
    });
    it('should return an employee object', async () => {
      const jobToUpdate = {
        _id: '123',
        jobTitle: '',
        description: '',
        _Owner: '1234',
        setupHyperLinks: () => null,
      };
      await expect(updateJobByOwnerId(jobToUpdate, '1234', '', ''))
        .to.eventually.have.property('result')
        .that.is.an('object').with.property('_id');
    });
    after(() => {
      Job.findOneAndUpdate.restore();
    });
  });
});
