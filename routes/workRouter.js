import express from 'express';
import workController from '../Controllers/workController';
import MessageService from '../lib/utils/MessageService';

const workRouter = express.Router({ mergeParams: true });

workRouter.route('/')
  .get(workController.FindResource)
  .post(MessageService(405, 'Cannot create a new work'))
  .put(MessageService(405, 'Use /work/ID to update specific resource'))
  .delete(MessageService(405, 'Cannot delete a work'));

workRouter.route('/:workId')
  .get(workController.FindResourceById)
  .post(MessageService(405, 'Cannot create a work'))
  .put(workController.UpdateResource)
  .delete(MessageService(405, 'Cannot delete a work'));

export default workRouter;
