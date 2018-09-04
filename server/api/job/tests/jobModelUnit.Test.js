const chai = require('chai');
const dirtyChai = require('dirty-chai');
const { ObjectId } = require('mongoose').Types;
const Job = require('../jobModel');

const { expect } = chai;

chai.use(dirtyChai);

describe('Job Model Unit Tests', () => {
  const jobId = ObjectId();
  context('validation', () => {
    it('should use a specified id if there is one', () => {
      const newJob = new Job({
        _id: jobId,
      });
      expect(newJob).to.have.property('_id');
      expect(newJob._id).to.be.equal(jobId);
    });
    it('should create a new id if theer is no id', () => {
      const newJob = new Job();
      expect(newJob).to.have.property('_id');
      expect(newJob._id).to.not.be.null();
    });
    it('should create a default job title if there isnt one', () => {
      const newJob = new Job({
        _id: jobId,
      });
      expect(newJob).to.have.property('jobTitle');
      expect(newJob.jobTitle).to.not.be.null();
      expect(newJob.jobTitle).to.be.equal('Empty');
    });
    it('should creaet description if there isnt one', () => {
      const newJob = new Job({
        _id: jobId,
      });
      expect(newJob).to.have.property('description');
      expect(newJob.description).to.not.be.null();
      expect(newJob.description).to.be.equal('Empty');
    });
    it('should throw validation error if there is no _Owner', (done) => {
      const newJob = new Job({
        _id: jobId,
      });
      newJob.validate((err) => {
        expect(err.errors).to.have.property('_Owner');
        done();
      });
    });
  });
  context('methods', () => {
    describe('setupHyperLinks', () => {
      it('should set up the hyper links in the models links property', () => {
        const newJob = new Job({
          _id: jobId,
          links: [],
        });
        newJob.setupHyperLinks('localhost:3000', 'testing');
        expect(newJob.links).to.be.an('array');
        expect(newJob.links).to.not.be.empty();
        expect(newJob.links[0]).to.have.property('rel');
        expect(newJob.links[0]).to.have.property('type');
        expect(newJob.links[0]).to.have.property('href');
        expect(newJob.links[0]).to.have.property('description');
      });
    });
  });
});
