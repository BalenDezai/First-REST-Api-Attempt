const express = require('express');
const scheduleController = require('./scheduleController');
const MessageService = require('../../util/MessageService');

const scheduleRouter = express.Router({ mergeParams: true });

scheduleRouter.route('/')
  .get(scheduleController.FindResource)
  .post(MessageService(405, 'Cannot create a new schedule'))
  .patch(MessageService(405, 'Use schedule/id to update a specfic schedule'))
  .delete(MessageService(405, 'Cannot delete a schedule'));

scheduleRouter.route('/scheduleId')
  .get(scheduleController.FindResource)
  .post(MessageService(405, 'Cannot create a new schedule'))
  .patch(scheduleController.UpdateResource)
  .delete(MessageService(405, 'Cannot delete a schedule'));

module.exports = scheduleRouter;
