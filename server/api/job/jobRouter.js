const jobRouter = require('express').Router({ mergeParams: true });
const jobController = require('./jobController');
const MessageService = require('../../util/MessageService');
const verifyRole = require('../../middleware/authMIddleware/verifyRole');
const validateFields = require('../../middleware/validationMiddleware/jobControllerValidation');
const validationErrorHandler = require('../../middleware/validationMiddleware/validationErrorHandler');

jobRouter.route('/')
  .get(jobController.FindResource)
  .post(MessageService(405, 'Cannot create a new job'))
  .patch(verifyRole(), validateFields.updateFields, validationErrorHandler(), jobController.UpdateResource)
  .delete(MessageService(405, 'Cannot delete a job'));

module.exports = jobRouter;
