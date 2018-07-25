const mongoose = require('mongoose');
const crypto = require('crypto');
const Employee = require('./employeeModel');
const Job = require('../job/jobModel');
const Wallet = require('../wallet/walletModel');
const Work = require('../work/workModel');
const User = require('../user/userModel');


const employeeController = {
  FindResource: async (req, res, next) => {
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
  },

  FindResourceById: async (req, res, next) => {
    try {
      const foundEmployee = await Employee.findOne({ _id: req.params.id }).populate('user', 'username email links');
      foundEmployee.SetUpHyperLinks(req.headers.host, req.originalUrl);
      foundEmployee.user.SetUpHyperLinks(req.headers.host, '/api/v1/users/');
      res.status(200).json(foundEmployee);
    } catch (error) {
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
        email: req.body.email,
        city: req.body.city,
        user: new mongoose.Types.ObjectId(),
        country: req.body.country,
        street: req.body.country,
        phoneNumber: req.body.phoneNumber,
        startDate: req.body.startDate,
        lastChanged: req.body.lastChanged,
      };
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
      const username = `${req.body.firstName.substring(0, 2)}${req.body.lastName.substring(0, 2)}`;
      const password = await crypto.randomBytes(12);
      await User.create({
        _id: newEmployee.user,
        username,
        email: newEmployee.email,
        employee: newEmployee._id,
        password: password.toString('hex'),
      });
      res.status(201).json(createdEmployee);
    } catch (error) {
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
      next(error);
    }
  },

  DeleteResource: async (req, res, next) => {
    try {
      await Employee.findOneAndRemove({ _id: req.params.id });
      res.status(200).json({ status: 200, message: 'Successfully deleted employee' });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = employeeController;

