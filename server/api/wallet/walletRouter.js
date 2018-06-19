import express from 'express';
import walletController from './walletController';
import MessageService from '../../util/MessageService';

const walletRouter = express.Router({ mergeParams: true });

walletRouter.route('/')
  .get(walletController.FindResource)
  .post(MessageService(405, 'Cannot create a new wallet'))
  .patch(walletController.UpdateResource)
  .delete(MessageService(405, 'Cannot delete a wallet'));

export default walletRouter;
