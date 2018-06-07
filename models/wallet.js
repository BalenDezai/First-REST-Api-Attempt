import mongoose from 'mongoose';

const walletSchema = new mongoose.Schema({
  TotalEarned: Number,
  Pay: Number,
  LastMonthPay: Number,
  ThisMonthPay: Number,
  _Owner: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Person',
    },
  },
});

export default mongoose.model('Wallet', walletSchema);
