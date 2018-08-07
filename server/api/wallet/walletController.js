const Wallet = require('./walletModel');

module.exports = class WalletController {
  static async getWalletById(req, res, next) {
    try {
      const foundWallet = await Wallet.findOne({ _Owner: req.params.id });
      foundWallet.SetUpHyperLinks(req.headers.host, req.originalUrl);
      res.json(foundWallet);
    } catch (error) {
      next(error);
    }
  }

  static async updateWalletById(req, res, next) {
    try {
      //  performance might be worse than other options
      //  TODO: reconsider
      delete req.body._id;
      delete req.body._Owner;
      delete req.body.lastChanged;
      req.body.lastChanged  = new Date();
      const updatedWallet = await Wallet
        .findOneAndUpdate({ _Owner: req.params.id }, { $set: req.body }, { new: true });
      updatedWallet.SetUpHyperLinks(req.headers.host, req.originalUrl);
      res.status(200).json(updatedWallet);
    } catch (error) {
      next(error);
    }
  }
};
