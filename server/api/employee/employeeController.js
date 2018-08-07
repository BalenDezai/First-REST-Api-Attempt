const mongoose = require('mongoose');
const crypto = require('crypto');
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
        for (let i = 0; i < foundEmployees.length; i += 1) {
          foundEmployees[i].SetUpHyperLinks(req.headers.host, req.originalUrl);
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
      foundEmployee.SetUpHyperLinks(req.headers.host, req.originalUrl, true);
      foundEmployee.user.SetUpHyperLinks(req.headers.host, '/api/v1/users/');
      res.status(200).json(foundEmployee);
    } catch (error) {
      next(error);
    }
  }

  static async createEmployee(req, res, next) {
    try {
      const newEmployee = {
        _id: new mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        email: req.body.email,
        city: req.body.city,
        country: req.body.country,
        street: req.body.country,
        phoneNumber: req.body.phoneNumber,
        startDate: req.body.startDate,
      };
      const username = `${req.body.firstName.substring(0, 2)}${req.body.lastName.substring(0, 2)}`;
      const password = await crypto.randomBytes(12);
      const newUser = {
        _id: new mongoose.Types.ObjectId(),
        username,
        email: newEmployee.email,
        employee: newEmployee._id,
        password: password.toString('hex'),
      };
      newEmployee.user = newUser._id;
      const createdEmployee = await Employee.create(newEmployee);
      createdEmployee.SetUpHyperLinks(req.headers.host, req.originalUrl);
      await Job.create({
        _Owner: createdEmployee._id,
      });
      await Wallet.create({
        _Owner: createdEmployee._id,
      });
      await Work.create({
        _Owner: createdEmployee._id,
      });
      await User.create(newUser);
      res.status(201).json(createdEmployee);
    } catch (error) {
      next(error);
    }
  }

  static async updateEmployeeById(req, res, next) {
    try {
      //  performance might be worse than other options
      //  TODO: reconsider
      delete req.body._id;
      delete req.body.user;
      delete req.body.lastChanged;
      req.body.lastChanged = new Date();
      const updatedEmployee = await Employee
        .findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true });
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
