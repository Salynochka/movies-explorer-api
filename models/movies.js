const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'страна создания фильма - обязательное поле'],
  },
  description: {
    type: String,
    required: [true, 'описание фильма - обязательное поле'],
  },
  director: {
    type: String,
    required: [true, 'режессёр фильма - обязательное поле'],
  },
  duration: {
    type: Number,
    required: [true, 'длительность фильма - обязательное поле'],
  },
  image: {
    type: String,
    required: [true, 'постер к фильму - обязательное поле'],
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Некорректно переданный URL',
    },
  },
  movieId: {
    type: Number,
    required: [true, 'не передан id фильма'],
  },
  nameEN: {
    type: String,
    required: [true, 'название фильма на английском языке - обязательное поле'],
  },
  nameRU: {
    type: String,
    required: [true, 'название фильма на русском языке - обязательное поле'],
  },
  thumbnail: {
    type: String,
    required: [true, 'миниатюрное изображение постера фильма - обязательное поле'],
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Некорректно переданный URL',
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'трейлер фильма - обязательное поле'],
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Некорректно переданный URL',
    },
  },
  year: {
    type: String,
    required: [true, 'год создания фильма - обязательное поле'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'обязательное поле'],
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
