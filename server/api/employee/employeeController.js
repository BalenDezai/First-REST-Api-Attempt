const mongoose = require('mongoose');
const Employee = require('./employeeModel');
const Job = require('../job/jobModel');
const Schedule = require('../schedule/scheduleModel');
const Wallet = require('../wallet/walletModel');
const Work = require('../work/workModel');
const hlGenerator = require('../../util/HyperMediaLinksGenerator');

const employeeController = {
  FindResource: async (req, res, next) => {
    try {
      const foundEmployee = await Employee.find(req.query);
      hlGenerator(foundEmployee, req.headers.host, req.originalUrl, ['self', 'Wallet', 'Job', 'Schedules', 'Work']);
      const documents = {
        count: foundEmployee.length,
        employees: foundEmployee,
      };
      if (foundEmployee.length > 0) {
        res.status(200).json(documents);
      } else {
        res.status(204).json(documents);
      }
    } catch (error) {
      const err = new Error(error);
      err.status = 500;
      err.resMessage = 'Error processing the request';
      err.catchError = error;
      next(err);
    }
  },

  FindResourceById: async (req, res, next) => {
    try {
      const foundEmployee = await Employee.find({ _id: req.params.id });
      hlGenerator(foundEmployee, req.header.host, req.originalUrl, ['self', 'Wallet', 'Job', 'Schedules', 'Work']);
      res.status(200).json(foundEmployee);
    } catch (error) {
      error.status = 500;
      error.resMessage = 'Error processing the request';
      next(error);
    }
  },

  CreateResource: async (req, res, next) => {
    try {
      const newEmployee = {
        _id: req.body._id || new mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        city: req.body.city,
        country: req.body.country,
        street: req.body.country,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        startDate: req.body.startDate,
        lastChanged: req.body.lastChanged,
      };
      const createdEmployee = await Employee.create(newEmployee);
      const endpoints = ['self', 'Wallet', 'Job', 'Schedules', 'Work'];
      hlGenerator(createdEmployee, req.headers.host, req.originalUrl, endpoints);
      await Job.create({
        _id: new mongoose.Types.ObjectId(),
        _Owner: createdEmployee._id,
      });
      await Wallet.create({
        _id: new mongoose.Types.ObjectId(),
        _Owner: createdEmployee._id,
      });
      await Work.create({
        _id: new mongoose.Types.ObjectId(),
        _Owner: createdEmployee._id,
      });
      res.status(201).json(createdEmployee);
    } catch (error) {
      error.status = 500;
      error.resMessage = 'Error processing the request';
      next(error);
    }
  },

  UpdateResource: async (req, res, next) => {
    try {
      const updatedEmployee = await Employee
        .findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
      res.status(200).json(updatedEmployee);
    } catch (error) {
      error.status = 500;
      error.resMessage = 'Error processing the request';
      next(error);
    }
  },

  DeleteResource: async (req, res, next) => {
    try {
      await Employee.remove({ _id: req.params.id });
      res.status(200).json({ status: 200, message: 'Successfully deleted employee' });
    } catch (error) {
      error.status = 500;
      error.resMessage = 'Error processing the request';
      next(error);
    }
  },
};

module.exports = employeeController;

