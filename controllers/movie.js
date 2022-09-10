const { Movie } = require('../models/movie');
const {
  BadRequestError, NotFoundError, ForbiddenError,
} = require('../error/index');
const { messageErrorMovie } = require('../utils/messageError');

exports.getMovies = async (req, res, next) => {
  try {
    const movie = await Movie.find({ owner: req.user._id });
    res.status(200).send({
      movie,
    });
  } catch (error) {
    next(error);
  }
};

exports.saveMovies = async (req, res, next) => {
  try {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
    } = req.body;
    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
      owner: req.user._id,
    });
    res.status(201).send({
      movie,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError(messageErrorMovie.BAD_REQUEST_MOVIE));
      return;
    }
    next(error);
  }
};

exports.deleteMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    if (!movie) {
      next(new NotFoundError(messageErrorMovie.NOT_FOUND_MOVIE));
      return;
    }
    if (req.user._id !== String(movie.owner)) {
      next(new ForbiddenError(messageErrorMovie.FORBIDDEN_MOVIE));
      return;
    }
    await Movie.findByIdAndRemove(id);
    res.send({
      movie,
    });
  } catch (error) {
    next(error);
  }
};
