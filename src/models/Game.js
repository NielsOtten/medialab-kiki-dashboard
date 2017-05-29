import mongoose from 'mongoose';

const Schema = mongoose.Schema({
  coins: {
    type: Number,
    required: true,
  },
  totalJumps: {
    type: Number,
    required: true
  },
  playTime: {
    type: Number,
    required: true,
  },
  distance: {
    type: Number,
    Required: true,
  },
  timestamp: {
    type: Date,
    default: () => new Date(),
  },
});

export default mongoose.model('Game', Schema);