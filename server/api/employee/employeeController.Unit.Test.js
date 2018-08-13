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
      const fifteenYearsAgo = Date.parse('2015/07/23') //momment().subtract(15, 'years').format();
      const Tests = Date.parse('dfdf')
      const now = momment('dfdsfdf', 'YYYY-MM-dd', true);
      console.log(new Date(fifteenYearsAgo));
      console.log(new Date('2015/07/23'));
      console.log(fifteenYearsAgo instanceof Date);
      console.log(Tests);
      console.log(now.isValid());
      // console.log(now < fifteenYearsAgo);
    });
  });
});
