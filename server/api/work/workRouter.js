import express from 'express';
import workController from './workController';
import MessageService from '../../util/MessageService';

const workRouter = express.Router({ mergeParams: true });

workRouter.route('/')
  .get(workController.FindResource)
  .post(MessageService(405, 'Cannot create a new work'))
  .patch(workController.UpdateResource)
  .delete(MessageService(405, 'Cannot delete a work'));

export default workRouter;
