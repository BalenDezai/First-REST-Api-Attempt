import express from 'express';
import peopleController from './peopleController';
import MessageService from '../../util/MessageService';

const peopleRouter = express.Router();

peopleRouter.route('/')
  .get(peopleController.FindResource)
  .post(peopleController.CreateResource)
  .put(MessageService(405, 'Use /people/ID to update specific resource'))
  .delete(MessageService(405, 'Use /people/ID to delete specific resource'));

peopleRouter.route('/:id')
  .get(peopleController.FindResourceById)
  .post(MessageService(405, 'Use /people/ only to create a new resource'))
  .put(peopleController.UpdateResource)
  .delete(peopleController.DeleteResource);


export default peopleRouter;
