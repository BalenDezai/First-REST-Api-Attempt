const chai = require('chai');
const sinon = require('sinon');
const Employee = require('./employeeModel')
const employeeController = require('./employeeController');

const should = chai.should();

describe('employeeController Unit Tests', () => {
  describe('GetAllEmployees', () => {
    let find;
    const req = {
      params: {
        id: '424454',
      },
      query: {

      },
      originalUrl: 'TEST',
      headers: {
        host: 'TEST',
      },
    };
    const res = {
      json: sinon.spy(),
      status(statuscode) {
        return this;
      },
    };
    before(async () => {
      find = sinon.stub(Employee, 'find').returns([{
        firstName: 'John',
        lastName: 'Smith',
        Phonenumber: '41415465',
        links: [],
        SetUpHyperLinks: () => null,
      }]);
      await employeeController.GetAllEmployees(req, res, (error) => { throw error; });
    });
    after(() => {
      Employee.find.restore();
    });
  })
});
