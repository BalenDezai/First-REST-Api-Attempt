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
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployeeById,
  deleteEmployeeById,
} = require('../employeeController');

const { expect } = chai;

chai.use(chaiAsPromised);
chai.use(dirtyChai);

describe('Employee Controller Unit Tests', () => {
  describe('getAllEmployees', () => {
    before(async () => {
      sinon.stub(Employee, 'find').callsFake((obj) => {
        const db = [{
          firstName: 'John',
          lastName: 'Smith',
          Phonenumber: '41415465',
          links: [],
          setupHyperLinks: () => null,
        }];
        return db.filter(employee => employee.firstName === obj.firstName);
      });
    });
    context('successfully found employee', () => {
      it('should return a promise that eventually resolves to an object with property result', async () => {
        await expect(getAllEmployees({ firstName: 'John' }, '', ''))
          .to.be.a('promise').that.is.eventually.fulfilled()
          .to.an('object').with.property('result');
      });
      it('result object should contain property count and employees', async () => {
        await expect(getAllEmployees({ firstName: 'John' }, '', ''))
          .to.eventually.be.an('object')
          .with.property('result').that.has.keys('count', 'employees');
      });
      it('employee property should be an array of employee objects', async () => {
        await expect(getAllEmployees({ firstName: 'John' }, '', ''))
          .to.eventually.be.an('object')
          .with.nested.property('result.employees')
          .that.is.an('array').with.property('[0]')
          .that.is.an('object').with.property('firstName');
      });
    });
    context('found no employee', () => {
      it('should return an object with status property of value 204 and result property of value null', async () => {
        await expect(getAllEmployees({ firstName: 'Oliver' }, '', ''))
          .to.eventually.be.an('object')
          .with.keys('status', 'result')
          .to.deep.equal({ status: 204, result: null });
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
            setupHyperLinks: () => null,
          },
          setupHyperLinks: () => null,
        }];
        return db.filter(employee => employee._id === id._id)[0];
      });
      sinon.stub(Employee, 'populate').resolves();
    });
    context('successfully found employee', () => {
      it('should return a promise that eventually resolves to an object with property result', async () => {
        await expect(getEmployeeById('123', '', ''))
          .to.be.a('promise').that.is.eventually.fulfilled()
          .to.an('object').with.property('result');
      });
      it('result property should be an employee object', async () => {
        await expect(getEmployeeById('123', '', ''))
          .to.eventually.have.property('result')
          .that.is.an('object').with.property('firstName');
      });
    });
    context('found no employee', () => {
      it('should return an object with status property of value 204 and result property of value of null', async () => {
        await expect(getEmployeeById('12345', '', ''))
          .to.eventually.be.an('object')
          .with.keys('status', 'result')
          .to.deep.equal({ status: 204, result: null });
      });
    });
    after(() => {
      Employee.findOne.restore();
      Employee.populate.restore();
    });
  });
  describe('updateEmployeeById', () => {
    context('successfully updated emploeye', () => {
      before(() => {
        sinon.stub(Employee, 'findOneAndUpdate').callsFake((id, obj) => {
          const newObj = obj.$set;
          newObj.setupHyperLinks = () => null;
          return newObj;
        });
      });
      it('should a promise that eventually resolves to an object with result property', async () => {
        const employeeToUpdate = {
          _id: '123',
          firstName: 'John',
          lastName: 'Smith',
          birthday: '1996/03/21',
          email: 'JohnnyBoy@mail.com',
          city: 'fake',
          country: 'USA',
          street: 'sdfsdfsdfsdf',
          phoneNumber: '45644544',
        };
        await expect(updateEmployeeById(employeeToUpdate, '123', '', ''))
          .to.be.a('promise').that.is.eventually.fulfilled()
          .to.be.an('object').with.property('result');
      });
      it('should return an employee object with a lastChanged property', async () => {
        const employeeToUpdate = {
          _id: '123',
          firstName: 'John',
          lastName: 'Smith',
          birthday: '1996/03/21',
          email: 'JohnnyBoy@mail.com',
          city: 'fake',
          country: 'USA',
          street: 'sdfsdfsdfsdf',
          phoneNumber: '45644544',
        };
        await expect(updateEmployeeById(employeeToUpdate, '123', '', ''))
          .to.eventually.have.property('result')
          .with.property('lastChanged');
      });
      after(() => {
        Employee.findOneAndUpdate.restore();
      });
    });
    context('unsuccessfully updated employee', () => {
      before(() => {
        sinon.stub(Employee, 'findOneAndUpdate').throws();
      });
      it('should throw an error', async () => {
        await expect(updateEmployeeById({}, '123', '', '')).to.be.rejected();
      });
      after(() => {
        Employee.findOneAndUpdate.restore();
      });
    });
  });
  describe('createEmployee', () => {
    before(() => {
      sinon.stub(Job, 'create').resolves();
      sinon.stub(Work, 'create').resolves();
      sinon.stub(Wallet, 'create').resolves();
      sinon.stub(User, 'create').resolves();
      sinon.stub(Employee, 'populate');
    });
    context('successfully create employee', () => {
      before(() => {
        sinon.stub(Employee, 'create').callsFake((employeeToCreate) => {
          const newCreatedEmployee = employeeToCreate;
          newCreatedEmployee.setupHyperLinks = () => null;
          newCreatedEmployee.user.setupHyperLinks = () => null;
          return Promise.resolve(newCreatedEmployee);
        });
      });
      it('should return a promise that eventually resolves to an object with status property of value 201 and result property ', async () => {
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
        };
        await expect(createEmployee(employeeToCreate))
          .to.be.a('promise').that.is.eventually.fulfilled()
          .to.an('object').with.keys('status', 'result')
          .and.property('status').that.equals(201);
      });
      it('should return an employee object', async () => {
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
        };
        await expect(createEmployee(employeeToCreate))
          .to.eventually.be.an('object').with.property('result')
          .that.has.property('_id');
      });
      after(() => {
        Employee.create.restore();
      });
    });
    context('unsuccessfully create employee', () => {
      before(() => {
        sinon.stub(Employee, 'create').throws(new Error());
      });
      it('should throw an error', async () => {
        await expect(createEmployee({})).to.be.rejected();
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
  describe('deleteEmployeeById', () => {
    context('successfully delete an employee', () => {
      before(() => {
        sinon.stub(Employee, 'findOneAndRemove');
      });
      it('should return a promise that eventually resolves to an object with a result property', async () => {
        await expect(deleteEmployeeById('123'))
          .to.be.a('promise').that.is.eventually.fulfilled()
          .to.an('object').with.property('result');
      });
      it('should return a string with the message "Successfully deleted"', async () => {
        await expect(deleteEmployeeById('123'))
          .to.eventually.have.property('result')
          .that.is.a('string')
          .that.equals('Successfully deleted');
      });
      after(() => {
        Employee.findOneAndRemove.restore();
      });
    });
    context('unsuccessfully deleted an employee', () => {
      before(() => {
        sinon.stub(Employee, 'findOneAndRemove').throws();
      });
      it('should throw an error', async () => {
        await expect(deleteEmployeeById('123')).to.be.rejected();
      });
      after(() => {
        Employee.findOneAndRemove.restore();
      });
    });
  });
});
