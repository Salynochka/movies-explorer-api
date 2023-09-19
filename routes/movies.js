// импорт роута
const router = require('express').Router();

// импорт контроллеров
const {
  getFilms, createFilm, deleteFilm,
} = require('../controllers/movies');

// импорт валидации
const { validateFilm } = require('../middlewares/validate');

// роуты
router.get('/', validateFilm, getFilms);
router.post('/', validateFilm, createFilm);
router.delete('/:_id', validateFilm, deleteFilm);

module.exports = router;
