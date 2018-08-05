const employeeRouter = require('express').Router();
const employeeController = require('./employeeController');
const MessageService = require('../../util/MessageService');
const verifyRole = require('../../middleware/authMIddleware/verifyRole');
const validateFields = require('../../middleware/validationMiddleware/employeeControllerValidation');
const validationErrorHandler = require('../../middleware/validationMiddleware/validationErrorHandler');

employeeRouter.route('/')
  .get(employeeController.GetAllEmployees)
  .post(verifyRole(), validateFields.createFields, validationErrorHandler(), employeeController.createEmployee)
  .patch(MessageService(405, 'Use /employees/id to update specific resource'))
  .delete(MessageService(405, 'Use /employees/id to delete specific resource'));

employeeRouter.route('/:id')
  .get(employeeController.getEmployeeById)
  .post(MessageService(405, 'Use /employees/ to create a new resource'))
  .patch(verifyRole(), validateFields.updateFields, validationErrorHandler(), employeeController.UpdateResource)
  .delete(verifyRole(), employeeController.DeleteResource);

module.exports = employeeRouter;
