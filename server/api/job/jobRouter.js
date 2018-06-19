import express from 'express';
import jobController from './jobController';
import MessageService from '../../util/MessageService';

const jobRouter = express.Router({ mergeParams: true });

jobRouter.route('/')
  .get(jobController.FindResource)
  .post(MessageService(405, 'Cannot create a new job'))
  .patch(jobController.UpdateResource)
  .delete(MessageService(405, 'Cannot delete a job'));

export default jobRouter;
