const mongoose = require('mongoose');
const Employee = require('./employeeModel');
const {
  findAllEmployees,
  findEmployeeById,
  hasKeys,
  createEmployeeObject,
  createEmployee,
  deleteEmployeeById,
  populate,
  copyObjectAndAddLastChanged
} = require('./employeeService');

module.exports = class EmployeeController {
  static idValidParam(req, res, next) {
    //  make sure user put req.params.id is avalid mongoose object
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      const error = new Error();
      error.status = 404;
      error.resMessage = 'Invalid ID';
      next(error);
    }
    next();
  }

  /**
   * gets all the employees, sets up HATEOAS and returns the result
   * @param {Object} obj an object representing what the user wants
   * @param {string} host the host name portion of the requested url
   * @param {string} originalUrl the requested url after the hostname
   * @returns {object} returns an object with the result and status code
   */
  static async getAllEmployees(obj, host, originalUrl) {
    const isQueryString = hasKeys(obj);
    const employees = await findAllEmployees(obj);
    if (employees.length > 0) {
      for (let i = 0; i < employees.length; i += 1) {
        employees[i].SetUpHyperLinks(host, originalUrl, { queryString: isQueryString });
      }
      return {
        status: 200,
        result: {
          count: employees.length,
          employees,
        },
      };
    }
    return {
      status: 204,
      result: null,
    };
  }
  /**
   * gets an employee by a given ID, sets up HATEAOS and returns the employee
   * @param {string} id id  to find employee by
   * @param {string} host the host name portion of the requested url
   * @param {string} originalUrl the requested url after the hostname
   * @returns {object} the found employee
   */
  static async getEmployeeById(id, host, originalUrl) {
    const foundEmployee = await findEmployeeById(id);
    foundEmployee.SetUpHyperLinks(host, originalUrl, { removeAfterSlash: 1 });
    foundEmployee.user.SetUpHyperLinks(host, '/api/v1/users/');
    return {
      result: foundEmployee,
    };
  }

  /**
   * creates given employee and given user in database
   * @param {object} employee employee object to create in database
   * @param {object} user user object to create in database
   * @param {string} host the host name portion of the requested url
   * @param {string} originalUrl the requested url after the hostname
   * @returns {object} returns an object containing the result and status
   */
  static async createEmployee(employee, user, host, originalUrl) {
    const employeeObject = await createEmployeeObject(employee, user);
    const createdEmployee = await createEmployee(employeeObject);
    await populate(createdEmployee, 'user', 'username role links');
    createdEmployee.user.SetUpHyperLinks(host, '/api/v1/users/');
    createdEmployee.SetUpHyperLinks(host, originalUrl);
    return {
      status: 204,
      result: createEmployee,
    };
  }

  //  TODO: FINISH THIS
  static async updateEmployeeById(employee, id) {
    const newEmployee = copyObjectAndAddLastChanged(employee, '_id user');
    const updatedEmployee = await Employee
      .findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true });
    updatedEmployee.SetUpHyperLinks(req.headers.host, req.originalUrl);
  }
  /**
   * deletes an employee in the database
   * @param {string} id the id to delete an employee by
   */
  static async deleteEmployeeById(id) {
    await deleteEmployeeById(id);
  }
};
