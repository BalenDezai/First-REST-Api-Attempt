import jobControllerDebug from 'debug';
import Work from './workModel';
import hlGenerator from '../../util/HyperMediaLinksGenerator';

const debug = jobControllerDebug('app:workController');

const workController = {
  FindResource: async (req, res) => {
    try {
      debug(req.params.id);
      const foundWork = await Work.find({ _Owner: req.params.id });
      hlGenerator(foundWork, req.headers.host, req.originalUrl, 'self');
      res.json(foundWork);
    } catch (error) {
      debug(error);
      res.status(204).send("Error Happened, couldn't find resource.");
    }
  },

  FindResourceById: async (req, res) => {
    try {
      debug(req.params.workId);
      const foundWork = await Work.findById(req.params.workId);
      res.json(foundWork);
    } catch (error) {
      res.status(204).send('No such resource exists');
    }
  },

  UpdateResource: async (req, res) => {
    try {
      const updatedWork = await Work.findByIdAndUpdate(req.params.walletId, req.body);
      res.json(updatedWork);
    } catch (error) {
      debug(error);
      res.sendStatus(500).send('Error processing the request');
    }
  },
};

export default workController;

