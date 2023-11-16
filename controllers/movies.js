const Movie = require('../models/movies');
const NotFoundError = require('../errors/not-found-error');
const IncorrectDataError = require('../errors/incorrect-data-error');
const ForbiddenError = require('../errors/forbidden-error');

module.exports.getFilms = (req, res, next) => {
  const owner = req.user._id;

  Movie.find({ owner })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createFilm = (req, res, next) => {
  Movie.create({ owner: req.user._id, ...req.body })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectDataError('Произошла ошибка'));
        return;
      }
      next(err);
    });
};

module.exports.deleteFilm = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError('Запрашиваемый фильм не найден'));
      }
      if (movie.owner.toString() !== req.user._id) {
        return next(new ForbiddenError('Нельзя удалить чужой фильм'));
      }
      return Movie.findByIdAndDelete(req.params._id).then(() => res.send(movie));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new IncorrectDataError('Произошла ошибка'));
      }
      return next(err);
    });
};
