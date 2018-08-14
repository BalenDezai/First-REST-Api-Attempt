const Wallet = require('./walletModel');
const moment = require('moment');
const copyObject = require('../../util/clonePropertiesToNewObject');

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
      req.body = copyObject(req.body, '_id _Owner');
      req.body.lastChanged = moment().format('YYYY/MM/DD');
      const updatedWallet = await Wallet
        .findOneAndUpdate({ _Owner: req.params.id }, { $set: req.body }, { new: true });
      updatedWallet.SetUpHyperLinks(req.headers.host, req.originalUrl);
      res.status(200).json(updatedWallet);
    } catch (error) {
      next(error);
    }
  }
};
