const chai = require('chai');
const dirtyChai = require('dirty-chai');
const { ObjectId } = require('mongoose').Types;
const Schedule = require('../scheduleModel');

const { expect } = chai;

chai.use(dirtyChai);

describe('Schedule Model Unit Tests', () => {
  const scheduleId = ObjectId();
  const newSchedule = new Schedule({
    _id: scheduleId,
    links: [],
  });
  context('validation', () => {
    it('should use a specified id if there is one', () => {
      expect(newSchedule).to.have.property('_id').which.is.equal(scheduleId);
    });
    it('should create a new id if there is no id', () => {
      const newScheduleNewId = new Schedule();
      expect(newScheduleNewId).to.have.property('_id').which.is.not.null();
    });
    it('should throw validation error if there is no _Owner property', (done) => {
      newSchedule.validate((err) => {
        expect(err.errors).to.have.property('_Owner');
        done();
      });
    });
    it('should throw validation error if there is no start property', (done) => {
      newSchedule.validate((err) => {
        expect(err.errors).to.have.property('start');
        done();
      });
    });
    it('should throw validation error if there is no end property', (done) => {
      newSchedule.validate((err) => {
        expect(err.errors).to.have.property('end');
        done();
      });
    });
  });
  context('methods', () => {
    describe('setupHyperLinks', () => {
      it('should set up the hyper links in the models links property', () => {
        newSchedule.setupHyperLinks('', '');
        expect(newSchedule.links).to.be.an('array').that.is.not.empty();
        expect(newSchedule.links[0]).to.have.property('rel');
      });
    });
  });
});
