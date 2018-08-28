const chai = require('chai');
const sinon = require('sinon');
const dirtyChai = require('dirty-chai');
const Employee = require('./employeeModel');
const Job = require('../job/jobModel');
const Wallet = require('../wallet/walletModel');
const Work = require('../work/workModel');
const User = require('../user/userModel');
const { getAllEmployees, getEmployeeById, createEmployee } = require('./employeeController');

const { expect } = chai;
chai.use(dirtyChai);

describe('employeeController Unit Tests', () => {
  describe('getAllEmployees', () => {
    before(async () => {
      sinon.stub(Employee, 'find').callsFake((obj) => {
        const db = [{
          firstName: 'John',
          lastName: 'Smith',
          Phonenumber: '41415465',
          links: [],
          SetUpHyperLinks: () => null,
        }];
        const foundemployees = db.filter(employee => employee.firstName === obj.firstName);
        const finalVersion = {
          foundemployees,
          exec: function exec() {
            return this.foundemployees;
          },
        };
        return finalVersion;
      });
    });
    context('successfully found employee', () => {
      it('should return an object with property result', async () => {
        const result = await getAllEmployees({ firstName: 'John' }, 'http://localhost:3000', '/api/v/employees');
        expect(result).to.haveOwnProperty('result');
      });
      it('result object should contain property count and employees', async () => {
        const result = await getAllEmployees({ firstName: 'John' }, 'http://localhost:3000', '/api/v/employees');
        expect(result.result).to.be.an('object');
        expect(result.result).to.haveOwnProperty('count');
        expect(result.result).to.haveOwnProperty('employees');
      });
      it('employee property should be an array of employee objects', async () => {
        const result = await getAllEmployees({ firstName: 'John' }, 'http://localhost:3000', '/api/v/employees');
        expect(result.result.employees).to.be.an('array');
        expect(result.result.employees[0]).to.be.an('object');
        expect(result.result.employees[0]).to.haveOwnProperty('firstName');
      });
    });
    context('found no employee', () => {
      it('should return an object with status property of value 204 and result property of value null', async () => {
        const result = await getAllEmployees({ firstName: 'Oliver' }, 'http://localhost:3000', '/api/v/employees');
        expect(result).to.be.an('object');
        expect(result.status).to.equal(204);
        expect(result.result).to.be.null();
      });
    });
    after(() => {
      Employee.find.restore();
    });
  });
  describe('getEmployeeById', () => {
    before(() => {
      sinon.stub(Employee, 'findOne').callsFake((id) => {
        const db = [{
          _id: '123',
          firstName: 'John',
          lastName: 'Smith',
          Phonenumber: '41415465',
          user: {
            SetUpHyperLinks: () => null,
          },
          SetUpHyperLinks: () => null,
        }];
        const foundEmployee = {
          found: db.filter(employee => employee._id === id._id)[0],
          populate: function populate() {
            return this;
          },
          exec: function exec() {
            return this.found;
          },
        };
        return foundEmployee;
      });
    });
    context('successfully found employee', () => {
      it('should return an object with property result', async () => {
        const result = await getEmployeeById('123', 'http://localhost:3000', '/api/v/employees');
        expect(result).to.be.an('object');
      });
      it('result property should be an employee object', async () => {
        const result = await getEmployeeById('123', 'http://localhost:3000', '/api/v/employees');
        expect(result.result).to.be.an('object');
        expect(result.result).to.haveOwnProperty('firstName');
      });
    });
    context('found no employee', () => {
      it('should return an object with status property of value 201 and result property of value of null', async () => {
        const result = await getEmployeeById('12345', 'http://localhost:3000', '/api/v/employees');
        expect(result).to.be.an('object');
        expect(result.status).to.be.equal(201);
        expect(result.result).to.be.null();
      });
    });
    after(() => {
      Employee.findOne.restore();
    });
    describe('createEmployee', () => {
      before(() => {
        sinon.stub(Job, 'create').resolves();
        sinon.stub(Work, 'create').resolves();
        sinon.stub(Wallet, 'create').resolves();
        sinon.stub(User, 'create').resolves();
        sinon.stub(Employee, 'populate').returns({ exec: function exec() { return null; } });
      });
      context('successfully create employee', () => {
        before(() => {
          sinon.stub(Employee, 'create').callsFake((employeeToCreate) => {
            const newCreatedEmployee = employeeToCreate;
            newCreatedEmployee.SetUpHyperLinks = () => null;
            newCreatedEmployee.user.SetUpHyperLinks = () => null;
            return Promise.resolve(newCreatedEmployee);
          });
        });
        it('should return an object', async () => {
          const employeeToCreate = {
            _id: 'sdfsdfs54df4sd5f',
            firstName: 'John',
            lastName: 'Smith',
            birthday: '1996/03/21',
            email: 'JohnnyBoy@mail.com',
            city: 'fake',
            country: 'USA',
            street: 'sdfsdfsdfsdf',
            phoneNumber: '45644544',
          }
          const result = await createEmployee(employeeToCreate);
          const test = await result.result;
          console.log(result);
          expect(result).to.be.an('object');
        });
        after(() => {
          Employee.create.restore();
        });
      });
      context('unsuccessfully create employee', () => {
        before(() => {
          sinon.stub(Employee, 'create').rejects();
        });
        after(() => {
          Employee.create.restore();
        });
      });
      after(() => {
        Job.create.restore();
        Work.create.restore();
        Wallet.create.restore();
        User.create.restore();
        Employee.populate.restore();
      });
    });
  });
});
