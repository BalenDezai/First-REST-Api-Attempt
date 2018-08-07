const scheduleRouter = require('express').Router({ mergeParams: true });
const ScheduleController = require('./scheduleController');
const MessageService = require('../../util/MessageService');
const verifyRole = require('../../middleware/authMIddleware/verifyRole');
const validateFields = require('../../middleware/validationMiddleware/scheduleControllerValidation');
const validationErrorHandler = require('../../middleware/validationMiddleware/validationErrorHandler');

scheduleRouter.param('scheduleId', ScheduleController.scheduleidValidParam);

scheduleRouter.route('/')
  .get(ScheduleController.getAllSchedules)
  .post(verifyRole(), validateFields.createFields, validationErrorHandler(), ScheduleController.createSchedule)
  .patch(MessageService(405, 'Use /schedules/id to update a specfic schedule'))
  .delete(MessageService(405, 'Use /schedules/id to delete a specfic schedule'));

scheduleRouter.route('/:scheduleId')
  .get(ScheduleController.getScheduleById)
  .post(MessageService(405, 'Use /schedules/ to create a schedule'))
  .patch(verifyRole(), validateFields.updateFields, validationErrorHandler(), ScheduleController.updatedScheduleById)
  .delete(verifyRole(), ScheduleController.deleteScheduleById);

module.exports = scheduleRouter;
