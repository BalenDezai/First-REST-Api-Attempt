import express from 'express';
import jobController from '../Controllers/jobController';
import MessageService from '../lib/utils/MessageService';

const jobRouter = express.Router({ mergeParams: true });

jobRouter.route('/')
  .get(jobController.FindResource)
  .post(MessageService(405, 'Cannot create a new wallet'))
  .put(MessageService(405, 'Use /job/ID to update specific resource'))
  .delete(MessageService(405, 'Cannot delete a wallet'));

jobRouter.route('/:jobId')
  .get(jobController.FindResourceById)
  .post(MessageService(405, 'Cannot create a job'))
  .put(jobController.UpdateResource)
  .delete(MessageService(405, 'Cannot delete a wallet'));

export default jobRouter;
