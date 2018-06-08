import jobControllerDebug from 'debug';
import Job from '../models/job';
import hlGenerator from '../lib/utils/HyperMediaLinksGenerator';

const debug = jobControllerDebug('app:jobController');

const jobController = {
  FindResource: async (req, res) => {
    try {
      const foundJob = await Job.find({ _Owner: req.params.id });
      hlGenerator(foundJob, req.headers.host, req.originalUrl, 'self');
      res.json(foundJob);
    } catch (error) {
      debug(error);
      res.status(204).send("Error Happened, couldn't find resource.");
    }
  },

  FindResourceById: async (req, res) => {
    try {
      const foundJob = await Job.findById(req.params.id);
      res.json(foundJob);
    } catch (error) {
      res.status(204).send('No such resource exists');
    }
  },

  UpdateResource: async (req, res) => {
    try {
      const updatedJob = await Job.findByIdAndUpdate(req.params.walletId, req.body);
      res.json(updatedJob);
    } catch (error) {
      debug(error);
      res.sendStatus(500).send('Error processing the request');
    }
  },
};

export default jobController;

