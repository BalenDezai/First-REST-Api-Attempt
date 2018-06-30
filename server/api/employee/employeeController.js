const mongoose = require('mongoose');
const Employee = require('./employeeModel');
const Job = require('../job/jobModel');
const Wallet = require('../wallet/walletModel');
const Work = require('../work/workModel');

const employeeController = {
  FindResource: async (req, res, next) => {
    try {
      const foundEmployees = await Employee.find(req.query, 'firstName lastName phoneNumber links');
      foundEmployees.forEach((employee) => {
        employee.SetUpHyperLinks(req.headers.host, req.originalUrl);
      });
      const documents = {
        count: foundEmployees.length,
        employees: foundEmployees,
      };
      if (documents.count > 0) {
        res.status(200).json(documents);
      } else {
        res.status(204).json(documents);
      }
    } catch (error) {
      error.status = 500;
      error.resMessage = 'Error processing the request';
      next(error);
    }
  },

  FindResourceById: async (req, res, next) => {
    try {
      const foundEmployee = await Employee.findOne({ _id: req.params.id }).select('-_v');
      foundEmployee.SetUpHyperLinks(req.headers.host, req.originalUrl);
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
        _id: new mongoose.Types.ObjectId(),
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
      createdEmployee.SetUpHyperLinks(req.headers.host, req.originalUrl);
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
        .findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true });
      updatedEmployee.SetUpHyperLinks(req.headers.host, req.originalUrl);
      res.status(200).json(updatedEmployee);
    } catch (error) {
      error.status = 500;
      error.resMessage = 'Error processing the request';
      next(error);
    }
  },

  DeleteResource: async (req, res, next) => {
    try {
      await Employee.findOneAndRemove({ _id: req.params.id });
      res.status(200).json({ status: 200, message: 'Successfully deleted employee' });
    } catch (error) {
      error.status = 500;
      error.resMessage = 'Error processing the request';
      next(error);
    }
  },
};

module.exports = employeeController;

