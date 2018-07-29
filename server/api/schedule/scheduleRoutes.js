const scheduleRouter = require('express').Router({ mergeParams: true });
const scheduleController = require('./scheduleController');
const MessageService = require('../../util/MessageService');
const verifyRole = require('../../middleware/authMIddleware/verifyRole');
const validateFields = require('../../middleware/validationMiddleware/scheduleControllerValidation');
const validationErrorHandler = require('../../middleware/validationMiddleware/validationErrorHandler');

scheduleRouter.route('/')
  .get(scheduleController.FindResource)
  .post(verifyRole(), validateFields.createFields, validationErrorHandler(), scheduleController.CreateResource)
  .patch(MessageService(405, 'Use /schedules/id to update a specfic schedule'))
  .delete(MessageService(405, 'Use /schedules/id to delete a specfic schedule'));

scheduleRouter.route('/:scheduleId')
  .get(scheduleController.findResourceById)
  .post(MessageService(405, 'Use /schedules/ to create a schedule'))
  .patch(verifyRole(), validateFields.updateFields, validationErrorHandler(), scheduleController.UpdateResource)
  .delete(verifyRole(), scheduleController.DeleteResource);

module.exports = scheduleRouter;
