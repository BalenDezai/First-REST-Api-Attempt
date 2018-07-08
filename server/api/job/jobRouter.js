const jobRouter = require('express').Router({ mergeParams: true });
const jobController = require('./jobController');
const MessageService = require('../../util/MessageService');

jobRouter.route('/')
  .get(jobController.FindResource)
  .post(MessageService(405, 'Cannot create a new job'))
  .patch(jobController.UpdateResource)
  .delete(MessageService(405, 'Cannot delete a job'));

module.exports = jobRouter;
