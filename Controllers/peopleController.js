import bookControllerDebug from 'debug';
import Person from '../models/person';

const debug = bookControllerDebug('app:peopleController');

const peopleController = {
  FindResource: async (req, res) => {
    try {
      const foundPeople = await Person.find(req.query).populate('_Job').populate('_Wallet').populate('_Work');
      if (foundPeople.length > 0) {
        res.json(foundPeople);
      } else {
        res.status(204).send('No Data Found.');
      }
    } catch (error) {
      debug(error);
      res.status(204).send("Error Happened, couldn't find resource.");
    }
  },

  FindResourceById: async (req, res) => {
    try {
      const foundPerson = await Person.findById(req.params.id);
      res.json(foundPerson);
    } catch (error) {
      debug(error)
      res.status(204).send('No such resource exists');
    }
  },

  CreateResource: async (req, res) => {
    try {
      const newCreatedPerson = await Person.create(req.body);
      await Person.update(newCreatedPerson);
      res.status(201).send('New Resource Added');
    } catch (error) {
      debug(error);
      res.sendStatus(500).send('Error processing the request');
    }
  },

  UpdateResource: async (req, res) => {
    try {
      await Person.findByIdAndUpdate(req.params.id, req.body)
      res.status(200).send('Resource Updated');
    } catch (error) {
      debug(error);
      res.sendStatus(500).send('Error processing the request');
    }
  },

  DeleteResource: async (req, res) => {
    try {
      await Person.remove({ _id: req.params.id });
      res.status(200).send('Resource Deleted');
    } catch (error) {
      debug(error);
      res.sendStatus(500).send('Error processing the request');
    }
  },
};

export default peopleController;

