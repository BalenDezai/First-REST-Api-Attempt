const scheduleRouter = require('express').Router({ mergeParams: true });
const scheduleController = require('./scheduleController');
const MessageService = require('../../util/MessageService');

scheduleRouter.route('/')
  .get(scheduleController.FindResource)
  .post(scheduleController.CreateResource)
  .patch(MessageService(405, 'Use /schedules/id to update a specfic schedule'))
  .delete(MessageService(405, 'Use /schedules/id to delete a specfic schedule'));

scheduleRouter.route('/:scheduleId')
  .get(scheduleController.findResourceById)
  .post(MessageService(405, 'Use /schedules/ to create a schedule'))
  .patch(scheduleController.UpdateResource)
  .delete(scheduleController.DeleteResource);

module.exports = scheduleRouter;
