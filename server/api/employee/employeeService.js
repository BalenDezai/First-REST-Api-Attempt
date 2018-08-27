const mongoose = require('mongoose');
const crypto = require('crypto');
const moment = require('moment');
const Employee = require('./employeeModel');
const Job = require('../job/jobModel');
const Wallet = require('../wallet/walletModel');
const Work = require('../work/workModel');
const User = require('../user/userModel');
const copyObject = require('../../util/clonePropertiesToNewObject');


class EmployeeService {
  /**
   * calls the employee table with conditions and returns matching employees it finds
   * @param {Object} conditions which conditions the request wants it by
   * @returns {Promise} a Promise
   */
  static findAllEmployees(conditions) {
    return Employee.find(conditions, 'firstName lastName phoneNumber links').exec();
  }


  /**
   * finds an employee with the given id in the employees table
   * @param {string} id id to find employee by
   * @returns {Promise} a promise
   */
  static findEmployeeById(id) {
    return Employee.findOne({ _id: id }).populate('user', 'username email links').exec();
  }

  /**
   * finds an employee with the given id and deletes it from the table
   * @param {string} id id to delete employee by
   */
  static deleteEmployeeById(id) {
    return Employee.findOneAndRemove({ _id: id }).exec();
  }

  /**
   * populates an objects field with selected fields
   * @param {*} obj the object to populate
   * @param {*} path the field/path to populate
   * @param {*} select the fields to of the populated object
   * @returns {Promise} returns a promise
   */
  static populate(obj, path, select) {
    return Employee.populate(obj, { path, select }).exec();
  }

  /**
   * will create an employee in the database
   * @param {object} employee the employee object to create in the database
   */
  static createEmployee(employee) {
    const createAll = [
      Employee.create(employee),
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
    return new Promise((resolve, reject) => {
      Promise
        .all(createAll)
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * creates an object template resembling the employee model
   * @param {object} employee the employee to create the object for
   * @param {object} user the user to be created alongside it
   * @returns {object} an object resembling the employee model
   */
  static async createEmployeeObject(employee, user) {
    const newUser = user || {};
    const role = `${newUser.role.substring(0, 1).toUpperCase()}${newUser.role.substring(1, newUser.role.length).toLowerCase()}`;
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
      street: employee.country,
      phoneNumber: employee.phoneNumber,
      startDate: employee.startDate,
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

  static copyObjectAndAddLastChanged(obj, fields) {
    //  add evrey properti from req.body except for _id and user
    //  to newBody  to be updated
    //  better solution to delete operator (slow)
    const newObj = copyObject(obj, fields);
    newObj.lastChanged = moment().format('YYYY/MM/DD');
    return newObj;
  }
}

module.exports = EmployeeService;
