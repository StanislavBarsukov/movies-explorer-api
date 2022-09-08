const express = require('express');
const {
  getMovies, deleteMovie, saveMovies,
} = require('../controllers/movie');
const { saveMovieJoi, deleteMovieJoi } = require('../middlewares/validationJoi');

const movies = express.Router();

movies.get('/', getMovies);
movies.post('/', saveMovieJoi, saveMovies);
movies.delete('/:id', deleteMovieJoi, deleteMovie);

module.exports = { movies };
