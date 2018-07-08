const walletRouter = require('express').Router({ mergeParams: true });
const walletController = require('./walletController');
const MessageService = require('../../util/MessageService');

walletRouter.route('/')
  .get(walletController.FindResource)
  .post(MessageService(405, 'Cannot create a new wallet'))
  .patch(walletController.UpdateResource)
  .delete(MessageService(405, 'Cannot delete a wallet'));

module.exports = walletRouter;
