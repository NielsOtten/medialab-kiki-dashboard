import mongoose from 'mongoose';

const Schema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  target: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  progress: {
    type: Number,
    required: true,
    default: 0,
  },
  timestamp: {
    type: Date,
    default: () => new Date(),
  },
});

export default mongoose.model('Target', Schema);