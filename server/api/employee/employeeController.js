const debug = require('debug')('app:peopleController');
const mongoose = require('mongoose');
const Employee = require('./employeeModel');
const Job = require('../job/jobModel');
const Schedule = require('../schedule/scheduleModel');
const Wallet = require('../wallet/walletModel');
const Work = require('../work/workModel');
const hlGenerator = require('../../util/HyperMediaLinksGenerator');
const sendError = require('../../util/sendError');
const emptyModelTemplateGenerator = require('../../util/emptyModelTemplates');

const peopleController = {
  FindResource: async (req, res) => {
    try {
      const foundPeople = await Employee.find(req.query);
      if (foundPeople.length > 0) {
        res.status(200).json(foundPeople);
      } else {
        res.status(204).json({});
      }
    } catch (error) {
      debug(error);
      sendError(500, 'Error processing the request', error);
    }
  },

  FindResourceById: async (req, res) => {
    try {
      const foundPerson = await Employee.findById(req.params.id);
      res.json(foundPerson);
    } catch (error) {
      debug(error);
      sendError(500, 'Error processing the request', error);
    }
  },

  CreateResource: async (req, res) => {
    try {
      const newEmployee = {
        _id: mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        startDate: req.body.startDate,
        lastChanged: req.body.lastChanged,
        links: [],
      }
      const endpoints = ['self', 'wallet', 'workhours', 'job', 'schedule'];
      hlGenerator(newEmployee, req.headers.host, req.originalUrl, endpoints);
      const createdEmployee = await Employee.create(newEmployee);
      const emptyModelTemplates = emptyModelTemplateGenerator(createdEmployee._id, mongoose, req.headers.host, req.originalUrl);
      await Job.create(emptyModelTemplates.jobTemplate);
      await Wallet.create(emptyModelTemplates.walletTemplate);
      await Schedule.create(emptyModelTemplates.scheduleTemplate);
      await Work.create(emptyModelTemplates.workhoursTemplate);
      res.status(201).json(createdEmployee);
    } catch (error) {
      debug(error);
      sendError(500, 'Error processing the request', error);
    }
  },

  UpdateResource: async (req, res) => {
    try {
      const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(updatedEmployee);
    } catch (error) {
      debug(error);
      sendError(500, 'Error processing the request', error);
    }
  },

  DeleteResource: async (req, res) => {
    try {
      await Employee.remove({ _id: req.params.id });
      res.status(200).json({ status: 200, message: 'Successfully deleted employee' });
    } catch (error) {
      debug(error);
      sendError(500, 'Error processing the request', error);
    }
  },
};

module.exports = peopleController;

