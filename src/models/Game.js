import mongoose from 'mongoose';

const Schema = mongoose.Schema({
  coins: {
    type: Number,
    required: true,
  },
  totalJumps: {
    type: Number,
  },
  playTime: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: () => new Date(),
  },
});

export default mongoose.model('Game', Schema);