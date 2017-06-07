import mongoose from 'mongoose';

const Schema = mongoose.Schema({
  totalCoins: {
    type: Number,
    required: true
  },
  targetText: {
    type: String
  },
  timestamp: {
    type: Date,
    default: () => new Date(),
  },
});

export default mongoose.model('Target', Schema);