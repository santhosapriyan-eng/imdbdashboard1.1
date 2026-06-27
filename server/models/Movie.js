const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  rank: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  weekendGross: {
    type: String,
    default: '-',
  },
  totalGross: {
    type: String,
    default: '-',
  },
  weeks: {
    type: Number,
    default: 0,
  },
  imdbUrl: {
    type: String,
  },
  poster: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Movie', movieSchema);
