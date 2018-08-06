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
      if (Object.prototype.hasOwnProperty.call(req.body, 'wage')) {
        req.body.wage = `${req.body.wage.substring(0, 1).toUpperCase()}${req.body.wage.substring(1, req.body.wage.length).toLowerCase()}`;
      }
      if (!Object.prototype.hasOwnProperty.call(req.body, 'lastChanged')) {
        req.body.lastChanged = Date.now();
      }
      const updatedWallet = await Wallet
        .findOneAndUpdate({ _Owner: req.params.id }, { $set: req.body }, { new: true });
      updatedWallet.SetUpHyperLinks(req.headers.host, req.originalUrl);
      res.json(updatedWallet);
    } catch (error) {
      next(error);
    }
  }
};
