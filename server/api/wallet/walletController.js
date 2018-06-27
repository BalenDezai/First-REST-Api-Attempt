const Wallet = require('./walletModel');

const walletController = {
  FindResource: async (req, res, next) => {
    try {
      const foundWallet = await Wallet.findOne({ _Owner: req.params.id });
      //  TODO: add hyper links to owner and other items
      res.json(foundWallet);
    } catch (error) {
      error.status = 500;
      error.resMessage = 'Error processing the request';
      next(error);
    }
  },


  UpdateResource: async (req, res, next) => {
    try {
      const updatedWallet = await Wallet
        .findOneAndUpdate({ _Owner: req.params.id }, { $set: req.body }, { new: true });
      //  TODO: add hyper links to owner and other items
      res.json(updatedWallet);
    } catch (error) {
      error.status = 500;
      error.resMessage = 'Error processing the request';
      next(error);
    }
  },
};

module.exports = walletController;

