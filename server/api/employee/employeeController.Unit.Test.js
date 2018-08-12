const chai = require('chai');
const sinon = require('sinon');
const momment = require('moment');
const Employee = require('./employeeModel');
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
      await employeeController.getAllEmployees(req, res, (error) => { throw error; });
    });
    after(() => {
      Employee.find.restore();
    });
    it('should dfdfdf', () => {
      const fifteenYearsAgo = momment().subtract(15, 'years').format();
      const now = momment('dfdsfdf', 'YYYY-MM-dd', true);
      console.log(fifteenYearsAgo);
      console.log(now.isValid());
      // console.log(now < fifteenYearsAgo);
    });
  })
});
