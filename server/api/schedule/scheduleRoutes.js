const scheduleRouter = require('express').Router({ mergeParams: true });
const scheduleController = require('./scheduleController');
const MessageService = require('../../util/MessageService');
const verifyRole = require('../../middleware/authMIddleware/verifyRole');

scheduleRouter.route('/')
  .get(scheduleController.FindResource)
  .post(verifyRole, scheduleController.CreateResource)
  .patch(MessageService(405, 'Use /schedules/id to update a specfic schedule'))
  .delete(MessageService(405, 'Use /schedules/id to delete a specfic schedule'));

scheduleRouter.route('/:scheduleId')
  .get(scheduleController.findResourceById)
  .post(MessageService(405, 'Use /schedules/ to create a schedule'))
  .patch(verifyRole, scheduleController.UpdateResource)
  .delete(verifyRole, scheduleController.DeleteResource);

module.exports = scheduleRouter;
