import mongoose from 'mongoose';

const walletSchema = new mongoose.Schema({
  TotalEarned: Number,
  Pay: Number,
  LastMonthPay: Number,
  ThisMonthPay: Number,
  _Owner: String,
  Links: [],
});

export default mongoose.model('Wallet', walletSchema);
