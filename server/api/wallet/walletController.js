const Wallet = require('./walletModel');

const walletController = {
  FindResource: async (req, res, next) => {
    try {
      const foundWallet = await Wallet.findOne({ _Owner: req.params.id });
      foundWallet.SetUpHyperLinks(req.headers.host, req.originalUrl);
      res.json(foundWallet);
    } catch (error) {
      next(error);
    }
  },


  UpdateResource: async (req, res, next) => {
    try {
      const updatedWallet = await Wallet
        .findOneAndUpdate({ _Owner: req.params.id }, { $set: req.body }, { new: true });
      updatedWallet.SetUpHyperLinks(req.headers.host, req.originalUrl);
      res.json(updatedWallet);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = walletController;

