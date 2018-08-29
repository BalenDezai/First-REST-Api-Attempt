const chai = require('chai');
const sinon = require('sinon');
const dirtyChai = require('dirty-chai');
const Employee = require('./employeeModel');
const Job = require('../job/jobModel');
const Wallet = require('../wallet/walletModel');
const Work = require('../work/workModel');
const User = require('../user/userModel');
const {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployeeById,
  deleteEmployeeById,
} = require('./employeeController');

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
        return db.filter(employee => employee.firstName === obj.firstName);
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
  });
  describe('updateEmployeeById', () => {
    context('successfully updated emploeye', () => {
      before(() => {
        sinon.stub(Employee, 'findOneAndUpdate').callsFake((id, obj) => {
          const newObj = obj.$set;
          newObj.SetUpHyperLinks = () => null;
          return newObj;
        });
      });
      it('should return an object with result property', async () => {
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
        const result = await updateEmployeeById(employeeToUpdate, '123');
        expect(result).to.be.an('object');
        expect(result).to.haveOwnProperty('result');
      });
      it('should return an employee object, without the _id property and with a lastChanged property', async () => {
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
        const result = await updateEmployeeById(employeeToUpdate, '123');
        expect(result.result).to.be.an('object');
        expect(result.result).to.not.haveOwnProperty('_id');
        expect(result.result).to.haveOwnProperty('lastChanged');
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
        try {
          await updateEmployeeById(employeeToUpdate, '123');
        } catch (error) {
          expect(error).to.be.an('Error');
        }
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
          newCreatedEmployee.SetUpHyperLinks = () => null;
          newCreatedEmployee.user.SetUpHyperLinks = () => null;
          return newCreatedEmployee;
        });
      });
      it('should return an object with status property of value 204 and result property ', async () => {
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
        const result = await createEmployee(employeeToCreate);
        expect(result).to.be.an('object');
        expect(result).to.haveOwnProperty('status');
        expect(result.status).to.be.equal(204);
        expect(result).to.haveOwnProperty('result');
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
        const result = await createEmployee(employeeToCreate);
        expect(result.result).to.be.an('Object');
        expect(result.result).to.haveOwnProperty('_id');
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
        try {
          await createEmployee(employeeToCreate);
        } catch (error) {
          expect(error).to.be.an('Error');
        }
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
      it('should return an object with a result property', async () => {
        const result = await deleteEmployeeById('123');
        expect(result).to.be.an('object');
        expect(result).to.haveOwnProperty('result');
      });
      it('should return a string with the message "Successfully deleted"', async () => {
        const result = await deleteEmployeeById('123');
        expect(result.result).to.be.an('string');
        expect(result.result).to.equal('Successfully deleted');
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
        try {
          await deleteEmployeeById('123');
        } catch (error) {
          expect(error).to.be.an('Error');
        }
      });
      after(() => {
        Employee.findOneAndRemove.restore();
      });
    });
  });
});
