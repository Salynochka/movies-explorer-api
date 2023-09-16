const Movie = require('../models/movies');
const NotFoundError = require('../errors/not-found-error');
const IncorrectDataError = require('../errors/incorrect-data-error');
const ForbiddenError = require('../errors/forbidden-error');

module.exports.getFilms = (req, res, next) => {
  Movie.find()
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createFilm = (req, res, next) => {
  const {
    country, director,
    duration, year,
    description, image,
    trailer,
    nameRU, nameEN,
    thumbnail, movieId,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.send({
      data: movie,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectDataError('Произошла ошибка'));
        return;
      }
      next(err);
    });
};

module.exports.deleteFilm = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Запрашиваемый фильм не найден');
      } else if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Нельзя удалить чужой фильм');
      } else {
        Movie.deleteOne(movie)
          .then((deletedMovie) => {
            res.status(200).send(deletedMovie);
          })
          .catch(next);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectDataError('Произошла ошибка'));
        return;
      }
      next(err);
    });
};
