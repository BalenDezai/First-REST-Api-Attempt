const employeeRouter = require('express').Router();
const employeeController = require('./employeeController');
const MessageService = require('../../util/MessageService');

employeeRouter.route('/')
  .get(employeeController.FindResource)
  .post(employeeController.CreateResource)
  .patch(MessageService(405, 'Use /employees/id to update specific resource'))
  .delete(MessageService(405, 'Use /employees/id to delete specific resource'));

employeeRouter.route('/:id')
  .get(employeeController.FindResourceById)
  .post(MessageService(405, 'Use /employees/ to create a new resource'))
  .patch(employeeController.UpdateResource)
  .delete(employeeController.DeleteResource);

module.exports = employeeRouter;
