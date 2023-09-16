const express = require('express');
const { login, register } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const { validateRegister, validateLogin } = require('../middlewares/validate');
const { routerMovies } = require('./movies');
const { routerUsers } = require('./users');
const NotFoundError = require('../errors/not-found-error');

const app = express();

app.post('/signin', validateLogin, login);
app.post('/signup', validateRegister, register);

app.use(auth);

app.use('/movies', routerMovies);
app.use('/users', routerUsers);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Неправильный путь'));
});
