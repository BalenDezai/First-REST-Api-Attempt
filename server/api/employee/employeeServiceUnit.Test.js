const chai = require('chai');
const sinon = require('sinon');
const dirtyChai = require('dirty-chai');
const Employee = require('./employeeModel');
const Job = require('../job/jobModel');
const Wallet = require('../wallet/walletModel');
const Work = require('../work/workModel');
const User = require('../user/userModel');
const { findAllEmployees, findEmployeeById, updateEmployeeById } = require('./employeeService');

const { expect } = chai;
chai.use(dirtyChai);

describe('employeeService Unit Tests', () => {
  describe('findAllEmployees', () => {
    before(() => {
      sinon.stub(Employee, 'find').callsFake((conditions) => {
        const db = [{
          _id: '123',
          firstName: 'John',
          lastName: 'Smith',
          Phonenumber: '41415465',
          links: [],
          SetUpHyperLinks: () => null,
        }];
        return db.filter(employee => employee.firstName === conditions.firstName)[0];
      });
    });
    it('should return a promise', async () => {
      const employeeToFind = { firstName: 'John' };
      expect(findAllEmployees(employeeToFind)).to.be.a('promise');
    });
    it('should resolve to an employee object', async () => {
      const employeeToFind = { firstName: 'John' };
      const result = await findAllEmployees(employeeToFind);
      expect(result).to.be.an('object');
      expect(result).to.haveOwnProperty('_id');
    });
    it('should throw if not called with an object', async () => {
      const employeeToFind = 'firstName: John';
      try {
        await findAllEmployees(employeeToFind);
      } catch (error) {
        expect(error).to.be.an('Error');
        expect(error.message).to.be.equal('string is not an object');
      }
    });
    after(() => {
      Employee.find.restore();
    });
  });
  describe('findEmployeeById', () => {
    before(() => {
      sinon.stub(Employee, 'findOne').callsFake((obj) => {
        const db = [{
          _id: '123',
          firstName: 'John',
          lastName: 'Smith',
          Phonenumber: '41415465',
          links: [],
          SetUpHyperLinks: () => null,
        }];
        return {
          found: db.filter(employee => employee._id === obj._id)[0],
          populate: function populate() {
            return this.found;
          },
        };
      });
    });
    it('should return a promise', () => {
      const idToFind = '123';
      expect(findEmployeeById(idToFind)).to.be.a('promise');
    });
    it('should resolve to an employee object', async () => {
      const idToFind = '123';
      const result = await findEmployeeById(idToFind);
      expect(result).to.be.an('object');
      expect(result).to.haveOwnProperty('_id');
    });
    it('should throw if not called with a string', async () => {
      const idToFind = {};
      try {
        await findEmployeeById(idToFind);
      } catch (error) {
        expect(error).to.be.an('Error');
        expect(error.message).to.be.equal('object is not a string');
      }
    });
    after(() => {
      Employee.findOne.restore();
    });
  });
  describe('updateEmployeeById', () => {
    before(() => {
      sinon.stub(Employee, 'findOneAndUpdate').callsFake((toFindBy, toUpdate) => toUpdate);
    });
    it('should return a promise', () => {
      const idToFind = '123';
      const newUpdated = {
        _id: '123',
        firstName: 'John',
        lastName: 'Smith',
        Phonenumber: '41415465',
        links: [],
        SetUpHyperLinks: () => null,
      };
      expect(updateEmployeeById(newUpdated, idToFind)).to.be.a('promise');
    });
    //  TODO: finish rest here
    after(() => {
      Employee.findOneAndUpdate();
    });
  });
});
