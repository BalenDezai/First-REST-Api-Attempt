import bookControllerDebug from 'debug';
import mongoose from 'mongoose';
import Employee from './employeeModel';
import Job from '../job/jobModel';
import Schedule from '../schedule/scheduleModel';
import Wallet from '../wallet/walletModel';
import Work from '../work/workModel';
import hlGenerator from '../../util/HyperMediaLinksGenerator';
import sendError from '../../util/sendError';
import emptyModelTemplateGenerator from '../../util/emptyModelTemplates';

const debug = bookControllerDebug('app:peopleController');

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

export default peopleController;

