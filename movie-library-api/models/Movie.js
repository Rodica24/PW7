const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  imageUrl: { type: String, required: true },
  liked: { type: Boolean, default: false },
});

module.exports = mongoose.model('Movie', movieSchema);