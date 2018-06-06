import express from 'express';
import walletController from '../Controllers/walletController';
import MessageService from '../lib/utils/MessageService';

const router = express.Router();

router.route('/')
  .get(walletController.FindResource)
  .post(walletController.CreateResource)
  .put(MessageService(405, 'Use /wallet/ID to update specific resource'))
  .delete(MessageService(405, 'Use /wallet/ID to delete specific resource'));

router.route('/:id')
  .get(walletController.FindResourceById)
  .post(MessageService(405, 'Use /wallet/ only to create a new resource'))
  .put(walletController.UpdateResource)
  .delete(walletController.DeleteResource);

export default router;
