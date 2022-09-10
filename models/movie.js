const mongoose = require('mongoose');
const isUrl = require('validator/lib/isURL');

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
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (url) => isUrl(url),
      message: 'Некорректный URL-адрес',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (url) => isUrl(url),
      message: 'Некорректный URL-адрес',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (url) => isUrl(url),
      message: 'Некорректный URL-адрес',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
}, {
  versionKey: false,
});

const Movie = mongoose.model('movie', movieSchema);

module.exports = { Movie };
