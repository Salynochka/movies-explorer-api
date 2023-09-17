// импорт роутов
const router = require('express').Router();
const routerMovies = require('./movies');
const routerUsers = require('./users');

// импорт авторизации
const { auth } = require('../middlewares/auth');

// импорт контроллеров
const { login, register, signOut } = require('../controllers/users');

// импорт валидации
const { validateRegister, validateLogin } = require('../middlewares/validate');

// импорт ошибки
const NotFoundError = require('../errors/not-found-error');

// роуты без авторизации
router.post('/signin', validateLogin, login);
router.post('/signup', validateRegister, register);

// авторизация
router.use(auth);

// роуты с авторизацией
router.use('/movies', routerMovies);
router.use('/users', routerUsers);
router.post('/signout', signOut);

// обработка несуществующего url
router.use('*', (req, res, next) => {
  next(new NotFoundError('Неправильный путь'));
});

module.exports = router;
