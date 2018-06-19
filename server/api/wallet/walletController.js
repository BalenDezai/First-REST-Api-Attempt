import walletControllerDebug from 'debug';
import Wallet from './walletModel';
import sendError from '../../util/sendError';

const debug = walletControllerDebug('app:walletController');

const walletController = {
  FindResource: async (req, res) => {
    try {
      const foundWallet = await Wallet.find({ _Owner: req.params.id });
      res.json(foundWallet);
    } catch (error) {
      debug(error);
      sendError(500, 'Error processing the request', error);
    }
  },


  UpdateResource: async (req, res) => {
    try {
      const updatedWallet = await Wallet.findOneAndUpdate({ _Owner: req.params.id }, req.body, { new: true });
      res.json(updatedWallet);
    } catch (error) {
      debug(error);
      sendError(500, 'Error processing the request', error);
    }
  },
};

export default walletController;

