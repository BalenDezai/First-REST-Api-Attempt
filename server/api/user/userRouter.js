const userRouter = require('express').Router();
const UserController = require('./userController');
const MessageService = require('../../util/MessageService');
const validateFields = require('../../middleware/validationMiddleware/userControllerValidation');
const validationErrorHandler = require('../../middleware/validationMiddleware/validationErrorHandler');

userRouter.route('/')
  .get(UserController.getAllUsers)
  .post(validateFields.createFields, validationErrorHandler(), UserController.createOneUser)
  .patch(MessageService(405, 'Use /users/id to update a user'))
  .delete(MessageService(405, 'Use /users/id to delete a user'));

userRouter.route('/:id')
  .get(UserController.getOneUser)
  .post(MessageService(405, 'Use /users/ to create a user'))
  .patch(validateFields.updateFields, validationErrorHandler(), UserController.updateOneUser)
  .delete(UserController.deleteOneUser);

module.exports = userRouter;
