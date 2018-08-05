const workRouter = require('express').Router({ mergeParams: true });
const workController = require('./workController');
const MessageService = require('../../util/MessageService');
const verifyRole = require('../../middleware/authMIddleware/verifyRole');
const validateFields = require('../../middleware/validationMiddleware/workControllerValidation');
const validationErrorHandler = require('../../middleware/validationMiddleware/validationErrorHandler');

workRouter.route('/')
  .get(workController.FindResource)
  .post(MessageService(405, 'Cannot create a new work'))
  .patch(verifyRole(), validateFields.updateFields, validationErrorHandler(), workController.UpdateResource)
  .delete(MessageService(405, 'Cannot delete a work'));

module.exports = workRouter;
