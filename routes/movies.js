const router = require('express').Router();
const {
  getFilms, createFilm, deleteFilm,
} = require('../controllers/users');

/* const {
  validateFilm
} = require('../middlewares/validate'); */

router.get('/', validateFilm, getFilms);
router.post('/', validateFilm, createFilm);
router.delete('/_id', validateFilm, deleteFilm);

module.exports = router;
