import express from 'express';
import peopleController from '../Controllers/peopleController';
import MessageService from '../lib/utils/MessageService';

const router = express.Router();

router.route('/')
  .get(peopleController.FindResource)
  .post(peopleController.CreateResource)
  .put(MessageService(405, 'Use /people/ID to update specific resource'))
  .delete(MessageService(405, 'Use /people/ID to delete specific resource'));

router.route('/:id')
  .get(peopleController.FindResourceById)
  .post(MessageService(405, 'Use /people/ only to create a new resource'))
  .put(peopleController.UpdateResource)
  .delete(peopleController.DeleteResource);


export default router;
