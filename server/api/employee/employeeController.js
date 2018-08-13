const mongoose = require('mongoose');
const crypto = require('crypto');
const moment = require('moment');
const Employee = require('./employeeModel');
const Job = require('../job/jobModel');
const Wallet = require('../wallet/walletModel');
const Work = require('../work/workModel');
const User = require('../user/userModel');

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

  static async getAllEmployees(req, res, next) {
    try {
      const foundEmployees = await Employee.find(req.query, 'firstName lastName phoneNumber links');
      const documents = {
        count: foundEmployees.length,
        employees: foundEmployees,
      };
      if (documents.count > 0) {
        let isQueryString;
        if (Object.keys(req.query).length > 0) {
          isQueryString = true;
        } else {
          isQueryString = false;
        }
        for (let i = 0; i < foundEmployees.length; i += 1) {
          foundEmployees[i].SetUpHyperLinks(req.headers.host, req.originalUrl, { queryString: isQueryString });
        }
        res.status(200).json(documents);
      } else {
        res.status(204).json(documents);
      }
    } catch (error) {
      next(error);
    }
  }

  static async getEmployeeById(req, res, next) {
    try {
      const foundEmployee = await Employee.findOne({ _id: req.params.id }).populate('user', 'username email links');
      foundEmployee.SetUpHyperLinks(req.headers.host, req.originalUrl, { removeAfterSlash: 1 });
      foundEmployee.user.SetUpHyperLinks(req.headers.host, '/api/v1/users/');
      res.status(200).json(foundEmployee);
    } catch (error) {
      next(error);
    }
  }

  static async createEmployee(req, res, next) {
    try {
      req.body.user = req.body.user || {};
      const role = `${req.body.user.role.substring(0, 1).toUpperCase()}${req.body.user.role.substring(1, req.body.user.role.length).toLowerCase()}`;
      const newEmployee = {
        _id: new mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: moment(req.body.birthday, 'YYYY/MM/DD'),
        email: req.body.email,
        city: req.body.city,
        country: req.body.country,
        user: {
          _id: new mongoose.Types.ObjectId(),
          username: req.body.user.username || `${req.body.firstName.substring(0, 2)}${req.body.lastName.substring(0, 2)}`,
          email: req.body.email,
          role,
          password: req.body.user.password || await crypto.randomBytes(12).toString('hex'),
        },
        street: req.body.country,
        phoneNumber: req.body.phoneNumber,
        startDate: req.body.startDate,
        lastChanged: moment().format('YYYY/MM/DD'),
      };
      const createdEmployee = await Employee.create(newEmployee);
      await Job.create({
        _Owner: createdEmployee._id,
      });
      await Wallet.create({
        _Owner: createdEmployee._id,
      });
      await Work.create({
        _Owner: createdEmployee._id,
      });
      await User.create(newEmployee.user);
      await Employee.populate(createdEmployee, { path: 'user', select: 'username role links' });
      createdEmployee.user.SetUpHyperLinks(req.headers.host, '/api/v1/users/');
      createdEmployee.SetUpHyperLinks(req.headers.host, req.originalUrl);
      res.status(201).json(createdEmployee);
    } catch (error) {
      next(error);
    }
  }

  static async updateEmployeeById(req, res, next) {
    try {
      const newBody = {};
      const keys = Object.keys(req.body);
      //  add evrey properti from req.body except for _id and user
      //  to newBody  to be updated
      //  better solution to delete operator (slow)
      for (let i = 0; i < keys.length; i += 1) {
        if (keys[i] !== '_id' && keys[i] !== 'user') {
          newBody[keys[i]] = req.body[keys[i]];
        }
      }
      req.body.lastChanged = new Date();
      const updatedEmployee = await Employee
        .findOneAndUpdate({ _id: req.params.id }, { $set: newBody }, { new: true });
      updatedEmployee.SetUpHyperLinks(req.headers.host, req.originalUrl);
      res.status(200).json(updatedEmployee);
    } catch (error) {
      next(error);
    }
  }
  static async deleteEmployeeById(req, res, next) {
    try {
      await Employee.findOneAndRemove({ _id: req.params.id });
      res.status(200).json({ status: 200, message: 'Successfully deleted employee' });
    } catch (error) {
      next(error);
    }
  }
};
