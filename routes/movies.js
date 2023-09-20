// импорт роута
const router = require('express').Router();

// импорт контроллеров
const {
  getFilms, createFilm, deleteFilm,
} = require('../controllers/movies');

// импорт валидации
const { validateFilm, validateFilmId } = require('../middlewares/validate');

// роуты
router.get('/', getFilms);
router.post('/', validateFilm, createFilm);
router.delete('/:_id', validateFilmId, deleteFilm);

module.exports = router;
