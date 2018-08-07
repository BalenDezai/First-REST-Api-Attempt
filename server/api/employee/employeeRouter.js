const employeeRouter = require('express').Router();
const EmployeeController = require('./employeeController');
const MessageService = require('../../util/MessageService');
const verifyRole = require('../../middleware/authMIddleware/verifyRole');
const validateFields = require('../../middleware/validationMiddleware/employeeControllerValidation');
const validationErrorHandler = require('../../middleware/validationMiddleware/validationErrorHandler');

employeeRouter.param('id', EmployeeController.idValidParam);

employeeRouter.route('/')
  .get(EmployeeController.getAllEmployees)
  .post(verifyRole(), validateFields.createFields, validationErrorHandler(), EmployeeController.createEmployee)
  .patch(MessageService(405, 'Use /employees/id to update specific resource'))
  .delete(MessageService(405, 'Use /employees/id to delete specific resource'));

employeeRouter.route('/:id')
  .get(EmployeeController.getEmployeeById)
  .post(MessageService(405, 'Use /employees/ to create a new resource'))
  .patch(verifyRole(), validateFields.updateFields, validationErrorHandler(), EmployeeController.updateEmployeeById)
  .delete(verifyRole(), EmployeeController.deleteEmployeeById);

module.exports = employeeRouter;
