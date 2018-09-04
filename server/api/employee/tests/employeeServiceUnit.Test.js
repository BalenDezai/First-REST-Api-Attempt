const chai = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const dirtyChai = require('dirty-chai');
const Employee = require('../employeeModel');
const Job = require('../../job/jobModel');
const Wallet = require('../../wallet/walletModel');
const Work = require('../../work/workModel');
const User = require('../../user/userModel');
const {
  findAllEmployees,
  findEmployeeById,
  updateEmployeeById,
  deleteEmployeeById,
  createEmployee,
  createEmployeeObject,
  hasKeys,
  copyObjectAndAddLastChanged,
  populate,
} = require('../employeeService');

const { expect } = chai;

chai.use(chaiAsPromised);
chai.use(dirtyChai);

describe('Employee Service Unit Tests', () => {
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
    it('should return a promise that eventually resolves to an object', async () => {
      const employeeToFind = { firstName: 'John' };
      const findAllEmployeesPromise = findAllEmployees(employeeToFind);
      expect(findAllEmployeesPromise).to.be.a('promise');
      expect(findAllEmployeesPromise).to.be.fulfilled();
      expect(findAllEmployeesPromise).to.eventually.be.an('object');
    });
    it('should resolve to an employee object', () => {
      const employeeToFind = { firstName: 'John' };
      expect(findAllEmployees(employeeToFind)).to.eventually.have.property('_id');
    });
    it('should throw if called with an array', () => {
      const employeeToFind = ['firstName: John'];
      expect(findAllEmployees(employeeToFind)).to.eventually.be.rejectedWith('array is not an object');
    });
    it('should throw if not called with an object', () => {
      const employeeToFind = 'firstName: John';
      expect(findAllEmployees(employeeToFind)).to.eventually.be.rejectedWith(`${typeof employeeToFind} is not an object`);
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
          populate: function populatee() {
            return this.found;
          },
        };
      });
    });
    it('should return a promise that eventually resolves to an object', () => {
      const idToFind = '123';
      const findEmployeeByIdPromise = findEmployeeById(idToFind);
      expect(findEmployeeByIdPromise).to.be.a('promise');
      expect(findEmployeeByIdPromise).to.be.fulfilled();
      expect(findEmployeeByIdPromise).to.eventually.be.an('object');
    });
    it('should resolve to an employee object', () => {
      const idToFind = '123';
      expect(findEmployeeById(idToFind)).to.eventually.have.property('_id');
    });
    it('should throw if not called with a string', () => {
      const idToFind = {};
      expect(findEmployeeById(idToFind)).to.eventually.be.rejectedWith(`${typeof idToFind} is not a string`);
    });
    after(() => {
      Employee.findOne.restore();
    });
  });
  describe('updateEmployeeById', () => {
    before(() => {
      sinon.stub(Employee, 'findOneAndUpdate').callsFake((toFindBy, toUpdate) => toUpdate.$set);
    });
    it('should return a promise that eventually resolves to an object', () => {
      const idToFind = '123';
      const newUpdated = {
        _id: '123',
        firstName: 'John',
        lastName: 'Smith',
        Phonenumber: '41415465',
        links: [],
        SetUpHyperLinks: () => null,
      };
      const updateEmployeeByIdPromise = updateEmployeeById(newUpdated, idToFind);
      expect(updateEmployeeByIdPromise).to.be.a('promise');
      expect(updateEmployeeByIdPromise).to.be.fulfilled();
      expect(updateEmployeeByIdPromise).to.eventually.be.an('object');
    });
    it('should resolve to an employee object', () => {
      const idToFind = '123';
      const newUpdated = {
        _id: '123',
        firstName: 'John',
        lastName: 'Smith',
        Phonenumber: '41415465',
        links: [],
        SetUpHyperLinks: () => null,
      };
      expect(updateEmployeeById(newUpdated, idToFind)).to.eventually.have.property('_id');
    });
    it('should throw if employee arguement is an array', () => {
      const idToFind = '123';
      const newUpdated = ['_id: 123'];
      expect(updateEmployeeById(newUpdated, idToFind)).to.eventually.be.rejectedWith('array is not an object');
    });
    it('should throw if employee arguement is not an object', () => {
      const idToFind = '123';
      const newUpdated = '_id: 123';
      expect(updateEmployeeById(newUpdated, idToFind)).to.eventually.be.rejectedWith(`${typeof newUpdated} is not an object`);
    });
    it('should throw if id arguement is not a string', () => {
      const idToFind = 123;
      const newUpdated = {
        _id: '123',
        firstName: 'John',
        lastName: 'Smith',
        Phonenumber: '41415465',
        links: [],
        SetUpHyperLinks: () => null,
      };
      expect(updateEmployeeById(newUpdated, idToFind)).to.eventually.be.rejectedWith(`${typeof idToFind} is not a string`);
    });
    after(() => {
      Employee.findOneAndUpdate.restore();
    });
  });
  describe('deleteEmployeeById', () => {
    before(() => {
      sinon.stub(Employee, 'findOneAndRemove').callsFake((obj) => {
        const db = [{
          _id: '123',
          firstName: 'John',
          lastName: 'Smith',
          Phonenumber: '41415465',
          links: [],
          SetUpHyperLinks: () => null,
        }];
        return db.filter(employee => employee._id === obj._id)[0];
      });
    });
    it('should return a promise that eventually resolves to an object', () => {
      const id = '123';
      const deleteEmployeeByIdPromise = deleteEmployeeById(id);
      expect(deleteEmployeeByIdPromise).to.be.a('promise');
      expect(deleteEmployeeByIdPromise).to.be.fulfilled();
      expect(deleteEmployeeByIdPromise).to.eventually.be.an('object');
    });
    it('should resolve to an employee object', () => {
      const id = '123';
      expect(deleteEmployeeById(id)).to.eventually.have.property('_id');
    });
    it('should throw if id arguement is not a string', () => {
      const id = 123;
      expect(deleteEmployeeById(id)).to.eventually.be.rejectedWith(`${typeof id} is not a string`);
    });
    after(() => {
      Employee.findOneAndRemove.restore();
    });
  });
  describe('createEmployee', () => {
    before(() => {
      sinon.stub(Employee, 'create').callsFake(newEmployee => newEmployee);
      sinon.stub(Job, 'create');
      sinon.stub(Wallet, 'create');
      sinon.stub(Work, 'create');
      sinon.stub(User, 'create');
    });
    it('should return a promise that eventually resolves to an object', () => {
      const newEmployee = {
        _id: '123',
        firstName: 'John',
        lastName: 'Smith',
        Phonenumber: '41415465',
        links: [],
        SetUpHyperLinks: () => null,
      };
      const createEmployeePromise = createEmployee(newEmployee);
      expect(createEmployeePromise).to.be.a('promise');
      expect(createEmployee(newEmployee)).to.be.fulfilled();
      expect(createEmployeePromise).to.eventually.be.an('object');
    });
    it('should resolve to an employee object', () => {
      const newEmployee = {
        _id: '123',
        firstName: 'John',
        lastName: 'Smith',
        Phonenumber: '41415465',
        links: [],
        SetUpHyperLinks: () => null,
      };
      expect(createEmployee(newEmployee)).to.eventually.have.property('_id');
    });
    it('should throw if arguement is an array', () => {
      const newEmployee = ['_id: 123'];
      expect(createEmployee(newEmployee)).to.eventually.be.rejectedWith('array is not an object');
    });
    it('should throw if arguement is not an object', () => {
      const newEmployee = '_id: 123';
      expect(createEmployee(newEmployee)).to.eventually.be.rejectedWith(`${typeof newEmployee} is not an object`);
    });
    after(() => {
      Employee.create.restore();
      Job.create.restore();
      Wallet.create.restore();
      Work.create.restore();
      User.create.restore();
    });
  });
  describe('createEmployeeObject', () => {
    it('should return a promise that eventually resolves to an object', () => {
      const employeeToCreate = {
        firstName: 'John',
        lastName: 'Smith',
        birthday: '1996/07/23',
        email: 'testmai',
        city: '',
        country: '',
        user: {
          email: '',
          role: '',
        },
        street: '',
        phoneNumber: '',
        startDate: '',
      };
      const createEmployeeObjectPromise = createEmployeeObject(employeeToCreate);
      expect(createEmployeeObjectPromise).to.be.a('promise');
      expect(createEmployeeObjectPromise).to.be.fulfilled();
      expect(createEmployeeObjectPromise).to.eventually.be.an('object');
    });
    it('should resolve an employee template object', () => {
      const userToCreate = {
        email: '',
        role: 'administrator',
      };
      const employeeToCreate = {
        firstName: 'John',
        lastName: 'Smith',
        birthday: '1996/07/23',
        email: 'testmai',
        city: '',
        country: '',
        street: '',
        phoneNumber: '',
        startDate: '',
      };
      expect(createEmployeeObject(employeeToCreate, userToCreate)).to.eventually.have.property('_id');
    });
    it('should default role property to "Employee" if none is found', async () => {
      const employeeToCreate = {
        firstName: 'John',
        lastName: 'Smith',
        birthday: '1996/07/23',
        email: 'testmai',
        city: '',
        country: '',
        user: {
          email: '',
          role: '',
        },
        street: '',
        phoneNumber: '',
        startDate: '',
      };
      const result = await createEmployeeObject(employeeToCreate);
      expect(result.user.role).to.be.equal('Employee');
    });
    it('should capitalize first letter of role property when given a value', async () => {
      const userToCreate = {
        email: '',
        role: 'administrator',
      };
      const employeeToCreate = {
        firstName: 'John',
        lastName: 'Smith',
        birthday: '1996/07/23',
        email: 'testmai',
        city: '',
        country: '',
        street: '',
        phoneNumber: '',
        startDate: '',
      };
      const result = await createEmployeeObject(employeeToCreate, userToCreate);
      expect(result.user.role[0]).to.be.equal(userToCreate.role[0].toUpperCase());
    });
    it('should throw if employee arguement is an array', () => {
      const employee = ['dsfdf'];
      expect(createEmployeeObject(employee)).to.eventually.be.rejectedWith('array is not an object');
    });
    it('should throw if employee arguement is not an object', () => {
      const employee = 'dsfdf';
      expect(createEmployeeObject(employee)).to.eventually.be.rejectedWith(`${typeof employee} is not an object`);
    });
  });
  describe('populate', () => {
    before(() => {
      sinon.stub(Employee, 'populate').returns({
        _id: '123',
        firstName: 'John',
        lastName: 'Smith',
        Phonenumber: '41415465',
        links: [],
        SetUpHyperLinks: () => null,
      });
    });
    it('should return a promise that eventually resolves to an object', () => {
      const obj = { id: '123' };
      const path = 'test';
      const select = 'test';
      const populatePromise = populate(obj, path, select);
      expect(populatePromise).to.be.a('promise');
      expect(populatePromise).to.be.fulfilled();
      expect(populatePromise).to.eventually.be.an('object');
    });
    it('should resolve to an employee object', () => {
      const obj = { id: '123' };
      const path = 'test';
      const select = 'test';
      expect(populate(obj, path, select)).to.eventually.have.property('_id');
    });
    it('should throw if obj arguement is an array', () => {
      const obj = ['id: 123'];
      const path = 'test';
      const select = 'test';
      expect(populate(obj, path, select)).to.eventually.be.rejectedWith('array is not an object');
    });
    it('should throw if obj arguement is not an object', () => {
      const obj = ' id: 123';
      const path = 'test';
      const select = 'test';
      expect(populate(obj, path, select)).to.eventually.be.rejectedWith(`${typeof obj} is not an object`);
    });
    it('should throw if path arguement is not a string', () => {
      const obj = { id: 123 };
      const path = ['test'];
      const select = 'test';
      expect(populate(obj, path, select)).to.eventually.be.rejectedWith(`${typeof path} is not a string`);
    });
    it('should throw if select is not a string', () => {
      const obj = { id: 123 };
      const path = 'test';
      const select = { key: 'test' };
      expect(populate(obj, path, select)).to.eventually.be.rejectedWith(`${typeof select} is not a string`);
    });
    after(() => {
      Employee.populate.restore();
    });
  });
  describe('hasKeys', () => {
    it('should return true if an object has any key/value pair', () => {
      const obj = { key: 'value' };
      const result = hasKeys(obj);
      expect(result).to.be.true();
    });
    it('should return false if an object has no key/value pairs', () => {
      const obj = {};
      const result = hasKeys(obj);
      expect(result).to.be.false();
    });
  });
  describe('copyObjectAndAddLastChanged', () => {
    it('should return an object', () => {
      const obj = {
        _id: '123',
        links: [],
      };
      const newObj = copyObjectAndAddLastChanged(obj, 'links');
      expect(newObj).to.be.an('object');
    });
    it('should should add a lastChanged property to returned object', () => {
      const obj = {
        _id: '123',
        links: [],
      };
      const newObj = copyObjectAndAddLastChanged(obj, 'links');
      expect(newObj).to.have.property('lastChanged');
    });
    it('should exclude stated fields in returned object', () => {
      const obj = {
        _id: '123',
        links: [],
      };
      const newObj = copyObjectAndAddLastChanged(obj, 'links');
      expect(newObj).to.not.have.property('links');
    });
  });
});
