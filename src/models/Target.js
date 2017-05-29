import mongoose from 'mongoose';

const Schema = mongoose.Schema({
  totalCoins: {
    type: Number,
    required: true
  },
  targetText: {
    type: String
  }
});

export default mongoose.model('Target', Schema);