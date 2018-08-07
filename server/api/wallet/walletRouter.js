const walletRouter = require('express').Router({ mergeParams: true });
const WalletController = require('./walletController');
const MessageService = require('../../util/MessageService');
const verifyRole = require('../../middleware/authMIddleware/verifyRole');
const validateFields = require('../../middleware/validationMiddleware/walletControllerValidation');
const validationErrorHandler = require('../../middleware/validationMiddleware/validationErrorHandler');

walletRouter.route('/')
  .get(WalletController.getWalletById)
  .post(MessageService(405, 'Cannot create a new wallet'))
  .patch(verifyRole(), validateFields.updateFields, validationErrorHandler(), WalletController.updateWalletById)
  .delete(MessageService(405, 'Cannot delete a wallet'));

module.exports = walletRouter;
