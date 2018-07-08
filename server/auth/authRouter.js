const authRouter = require('express').Router();
const authController = require('./authController');
const verifyUser = require('../middleware/authMIddleware/verifyUser');
const verifyFields = require('../middleware/authMIddleware/verifyFields');
const verifyToken = require('../middleware/authMIddleware/verifyToken');
const getFullUser = require('../middleware/authMIddleware/getFullUser');

const verifyTokenAndGetUser = [verifyToken(), getFullUser()];

authRouter.route('/signup')
  .post(verifyFields(), authController.registerUser);

authRouter.route('/signin')
  .post(verifyUser(), authController.signinUser);

authRouter.route('/me')
  .all(verifyTokenAndGetUser)
  .get(authController.viewCurrentUserUser)
  .patch(authController.updateCurrentUser)
  .delete(authController.deleteCurrentUser);

module.exports = authRouter;
