const authRouter = require('express').Router();
const AuthController = require('./authController');
const verifyUser = require('../middleware/authMIddleware/verifyUser');
const verifyFields = require('../middleware/authMIddleware/verifyFields');
const verifyToken = require('../middleware/authMIddleware/verifyToken');
const getFullUser = require('../middleware/authMIddleware/getFullUser');

const verifyTokenAndGetUser = [verifyToken(), getFullUser()];

authRouter.route('/signup')
  .post(verifyFields(), AuthController.registerUser);

authRouter.route('/signin')
  .post(verifyUser(), AuthController.signinUser);

authRouter.route('/me')
  .all(verifyTokenAndGetUser)
  .get(AuthController.viewCurrentUserUser)
  .patch(AuthController.updateCurrentUser)
  .delete(AuthController.deleteCurrentUser);

module.exports = authRouter;
