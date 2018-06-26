const Wallet = require('./walletModel');

const walletController = {
  FindResource: async (req, res, next) => {
    try {
      const foundWallet = await Wallet.find({ _Owner: req.params.id });
      res.json(foundWallet);
    } catch (error) {
      const err = new Error(error);
      err.status = 500;
      err.resMessage = 'Error processing the request';
      err.catchError = error;
      next(err);
    }
  },


  UpdateResource: async (req, res, next) => {
    try {
      const updatedWallet = await Wallet
        .findOneAndUpdate({ _Owner: req.params.id }, req.body, { new: true });
      res.json(updatedWallet);
    } catch (error) {
      const err = new Error(error);
      err.status = 500;
      err.resMessage = 'Error processing the request';
      err.catchError = error;
      next(err);
    }
  },
};

module.exports = walletController;

