import mongoose from 'mongoose';

const walletSchema = new mongoose.Schema({
  TotalEarned: Number,
  Pay: Number,
  LastMonthPay: Number,
  ThisMonthPay: Number
});

export default mongoose.model('Wallet', walletSchema);