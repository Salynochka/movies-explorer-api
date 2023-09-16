const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Введите URL',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Введите URL',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Введите URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId, // NUMBER (должен быть)
    required: true,
    ref: 'movie',
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
