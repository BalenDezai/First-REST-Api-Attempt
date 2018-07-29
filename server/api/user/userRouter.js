const userRouter = require('express').Router();
const userController = require('./userController');
const MessageService = require('../../util/MessageService');
const validateFields = require('../../middleware/validationMiddleware/userControllerValidation');
const validationErrorHandler = require('../../middleware/validationMiddleware/validationErrorHandler');

userRouter.route('/')
  .get(userController.getAllUsers)
  .post(validateFields.createFields, validationErrorHandler(), userController.createOneUser)
  .patch(MessageService(405, 'Use /users/id to update a user'))
  .delete(MessageService(405, 'Use /users/id to delete a user'));

userRouter.route('/:id')
  .get(userController.getOneUser)
  .post(MessageService(405, 'Use /users/ to create a user'))
  .patch(validateFields.updateFields, validationErrorHandler(), userController.updateOneUser)
  .delete(userController.deleteOneUser);

module.exports = userRouter;
