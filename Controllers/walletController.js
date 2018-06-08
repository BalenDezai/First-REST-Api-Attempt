import walletControllerDebug from 'debug';
import Wallet from '../models/wallet';
import hlGenerator from '../lib/utils/HyperMediaLinksGenerator';

const debug = walletControllerDebug('app:walletController');

const walletController = {
  FindResource: async (req, res) => {
    try {
      const foundWallet = await Wallet.find({ _Owner: req.params.id });
      hlGenerator(foundWallet, req.headers.host, req.originalUrl, 'self');
      res.json(foundWallet);
    } catch (error) {
      debug(error);
      res.status(204).send("Error Happened, couldn't find resource.");
    }
  },

  FindResourceById: async (req, res) => {
    try {
      const foundWallet = await Wallet.findById(req.params.id);
      res.json(foundWallet);
    } catch (error) {
      res.status(204).send('No such resource exists');
    }
  },

  UpdateResource: async (req, res) => {
    try {
      const updatedWallet = await Wallet.findByIdAndUpdate(req.params.walletId, req.body);
      res.json(updatedWallet);
    } catch (error) {
      debug(error);
      res.sendStatus(500).send('Error processing the request');
    }
  },
};

export default walletController;

