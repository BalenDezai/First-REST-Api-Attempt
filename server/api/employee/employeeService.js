const mongoose = require('mongoose');
const crypto = require('crypto');
const moment = require('moment');
const Employee = require('./employeeModel');
const Job = require('../job/jobModel');
const Wallet = require('../wallet/walletModel');
const Work = require('../work/workModel');
const User = require('../user/userModel');
const { cloneProperties, capitalizeFirstLetter, populate } = require('../../util/utils');
//  TODO: extract populate from methods nad  make it seperate only
class EmployeeService {
  /**
   * calls the employee table with conditions and returns matching employees it finds
   * @param {Object} conditions which conditions the request wants it by
   * @returns {Promise} a Promise
   */
  static findAllEmployees(conditions) {
    return new Promise((resolve, reject) => {
      if (typeof conditions !== 'object') reject(new Error(`${typeof conditions} is not an object`));

      if (Array.isArray(conditions)) reject(new Error('array is not an object'));

      resolve(Employee.find(conditions, 'firstName lastName phoneNumber links'));
    });
  }

  /**
   * finds an employee with the given id in the employees table
   * @param {string} id id to find employee by
   * @returns {Promise} a promise
   */
  static findEmployeeById(id) {
    return new Promise((resolve, reject) => {
      if (typeof id !== 'string') reject(new Error(`${typeof id} is not a string`));

      resolve(Employee.findOne({ _id: id }));
    });
  }

  /**
   * finds an employee with given id and updates the employee with given object
   * @param {object} obj object with properties to update
   * @param {string} id id of the employee to update
   * @returns a promise
   */
  static updateEmployeeById(obj, id) {
    //  sets the oj property to the found employee, and returns the new verison
    return new Promise((resolve, reject) => {
      if (typeof id !== 'string') reject(new Error(`${typeof id} is not a string`));

      if (typeof obj !== 'object') reject(new Error(`${typeof obj} is not an object`));

      if (Array.isArray(obj)) reject(new Error('array is not an object'));

      resolve(Employee
        .findOneAndUpdate({ _id: id }, { $set: obj }, { new: true }));
    });
  }

  /**
   * finds an employee with the given id and deletes it from the table
   * @param {string} id id to delete employee by
   * @returns {promise} a promise
   */
  static deleteEmployeeById(id) {
    return new Promise((resolve, reject) => {
      if (typeof id !== 'string') reject(new Error(`${typeof id} is not a string`));

      resolve(Employee.findOneAndRemove({ _id: id }));
    });
  }

  /**
   * populates an objects field with selected fields
   * @param {object} obj the object to populate
   * @param {string} path the field/path to populate
   * @param {string} select the fields to of the populated object
   * @returns {Promise} returns a promise
   */
  static populate(obj, path, select) {
    return populate(Employee, obj, path, select);
  }

  /**
   * will create an employee in the database
   * @param {object} employee the employee object to create in the database
   * @returns {Promise} a promise to be resolved
   */
  static createEmployee(employee) {
    return new Promise((resolve, reject) => {
      if (typeof employee !== 'object') reject(new Error(`${typeof employee} is not an object`));
      if (Array.isArray(employee)) reject(new Error('array is not an object'));
      const createAll = [
        Job.create({
          _Owner: employee._id,
        }),
        Wallet.create({
          _Owner: employee._id,
        }),
        Work.create({
          _Owner: employee._id,
        }),
        User.create(employee.user),
      ];
      //  TODO: test if this works
      Promise.all(createAll);
      resolve(Employee.create(employee));
    });
  }

  /**
   * creates an object template resembling the employee model
   * @param {object} employee the employee to create the object for
   * @param {object} user the user to be created alongside it
   * @returns {object} an object resembling the employee model
   */
  static async createEmployeeObject(employee, user) {
    if (typeof employee !== 'object') throw new Error(`${typeof employee} is not an object`);

    if (Array.isArray(employee)) throw new Error('array is not an object');

    const newUser = user || {};
    let role;
    if (newUser.role) {
      //  TODO: add capitalFirstLeter to the service?
      role = capitalizeFirstLetter(newUser.role);
    }
    if (!newUser.role) {
      role = 'Employee';
    }
    return {
      _id: new mongoose.Types.ObjectId(),
      firstName: employee.firstName,
      lastName: employee.lastName,
      birthday: moment(employee.birthday, 'YYYY/MM/DD'),
      email: employee.email,
      city: employee.city,
      country: employee.country,
      user: {
        _id: new mongoose.Types.ObjectId(),
        username: newUser.username || `${employee.firstName.substring(0, 2)}${employee.lastName.substring(0, 2)}`,
        email: employee.email,
        role,
        password: newUser.password || await crypto.randomBytes(12).toString('hex'),
      },
      street: employee.street,
      phoneNumber: employee.phoneNumber,
      startDate: employee.startDate || moment().format('YYYY/MM/DD'),
      lastChanged: moment().format('YYYY/MM/DD'),
    };
  }

  /**
   * checks if an object has any keys or not
   * @param {object} object
   */
  static hasKeys(obj) {
    if (Object.keys(obj).length > 0) {
      return true;
    }
    return false;
  }

  /**
   * takes an object and returns a new object without the excluded fields
   * @param {object} obj object to copy
   * @param {string} fields fields to exclude
   */
  static copyObjectAndAddLastChanged(obj, fields) {
    //  add every property from obj except for properties in fields
    //  to newBody  to be updated
    //  better solution to delete operator (slow)
    const newObj = cloneProperties(obj, fields);
    newObj.lastChanged = moment().format('YYYY/MM/DD');
    return newObj;
  }
}

module.exports = EmployeeService;
