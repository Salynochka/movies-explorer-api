const Movie = require('../models/movies');
const NotFoundError = require('../errors/not-found-error');
const IncorrectDataError = require('../errors/incorrect-data-error');

module.exports.getFilms = (req, res, next) => {
  const owner = req.user._id;

  Movie.find({ owner })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createFilm = (req, res, next) => {
  Movie.create({ owner: req.user._id, ...req.body })
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
  Movie.deleteOne({ _id: req.params._id })
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Запрашиваемый фильм не найден');
      }
      return res.send({ message: 'Фильм удален' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectDataError('Произошла ошибка'));
        return;
      }
      next(err);
    });
};
