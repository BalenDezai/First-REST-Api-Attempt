const authRouter = require('express').Router();
const AuthController = require('./authController');
const verifyUser = require('../middleware/authMIddleware/verifyUser');
const verifyToken = require('../middleware/authMIddleware/verifyToken');
const getFullUser = require('../middleware/authMIddleware/getFullUser');
const validateFields = require('../middleware/validationMiddleware/authControllerValidation');
const validationErrorHandler = require('../middleware/validationMiddleware/validationErrorHandler');

const verifyTokenAndGetUser = [verifyToken(), getFullUser()];

authRouter.route('/signup')
  .post(validateFields.registrationFields, validationErrorHandler(), AuthController.registerUser);

authRouter.route('/signin')
  .post(validateFields.signinFields, validationErrorHandler(), verifyUser(), AuthController.signinUser);

authRouter.route('/me')
  .all(verifyTokenAndGetUser)
  .get(AuthController.viewCurrentUserUser)
  .patch(validateFields.updateFields, validationErrorHandler(), AuthController.updateCurrentUser)
  .delete(AuthController.deleteCurrentUser);

module.exports = authRouter;
