import express from 'express';
import jobController from './jobController';
import MessageService from '../../util/MessageService';

const jobRouter = express.Router({ mergeParams: true });

jobRouter.route('/')
  .get(jobController.FindResource)
  .post(MessageService(405, 'Cannot create a new job'))
  .put(MessageService(405, 'Use /job/ID to update specific resource'))
  .delete(MessageService(405, 'Cannot delete a job'));

jobRouter.route('/:jobId')
  .get(jobController.FindResourceById)
  .post(MessageService(405, 'Cannot create a job'))
  .put(jobController.UpdateResource)
  .delete(MessageService(405, 'Cannot delete a job'));

export default jobRouter;
