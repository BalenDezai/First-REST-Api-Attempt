const jobRouter = require('express').Router({ mergeParams: true });
const jobController = require('./jobController');
const MessageService = require('../../util/MessageService');
const verifyRole = require('../../middleware/authMIddleware/verifyRole');

jobRouter.route('/')
  .get(jobController.FindResource)
  .post(MessageService(405, 'Cannot create a new job'))
  .patch(verifyRole, jobController.UpdateResource)
  .delete(MessageService(405, 'Cannot delete a job'));

module.exports = jobRouter;
