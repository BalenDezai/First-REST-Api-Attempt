import bookControllerDebug from 'debug';
import Wallet from '../models/wallet';

const debug = bookControllerDebug('app:peopleController');

const peopleController = {
  FindResource: async (req, res) => {
    try {
      const foundPeople = await Wallet.find(req.query);
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
      const foundPerson = await Wallet.findById(req.params.id);
      res.json(foundPerson);
    } catch (error) {
      res.status(204).send('No such resource exists');
    }
  },

  CreateResource: async (req, res) => {
    try {

      await Wallet.create(req.body);

      res.status(201).send('New Resource Added');
    } catch (error) {
      debug(error);
      res.sendStatus(500).send('Error processing the reques');
    }

  },

  UpdateResource: async (req, res) => {
    try {
      await Wallet.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).send('Resource Updated');
    } catch (error) {
      debug(error);
      res.sendStatus(500).send('Error processing the request');
    }

  },

  DeleteResource: async (req, res) => {
    try {
      await Wallet.remove({ _id: req.params.id });
      res.status(200).send('Resource Deleted');
    } catch (error) {
      debug(error);
      res.sendStatus(500).send('Error processing the request');
    }
  }
}

export default peopleController;

