const peopleRouter = require('express').Router();
const peopleController = require('./employeeController');
const MessageService = require('../../util/MessageService');

peopleRouter.route('/')
  .get(peopleController.FindResource)
  .post(peopleController.CreateResource)
  .patch(MessageService(405, 'Use /people/ID to update specific resource'))
  .delete(MessageService(405, 'Use /people/ID to delete specific resource'));

peopleRouter.route('/:id')
  .get(peopleController.FindResourceById)
  .post(MessageService(405, 'Use /people/ only to create a new resource'))
  .patch(peopleController.UpdateResource)
  .delete(peopleController.DeleteResource);

module.exports = peopleRouter;
