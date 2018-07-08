const workRouter = require('express').Router({ mergeParams: true });
const workController = require('./workController');
const MessageService = require('../../util/MessageService');

workRouter.route('/')
  .get(workController.FindResource)
  .post(MessageService(405, 'Cannot create a new work'))
  .patch(workController.UpdateResource)
  .delete(MessageService(405, 'Cannot delete a work'));

module.exports = workRouter;
