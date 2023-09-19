const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const NotFoundError = require('../errors/not-found-error');
const IncorrectDataError = require('../errors/incorrect-data-error');
const AlreayExistError = require('../errors/already-exist-error');

const { NODE_ENV, SECRET_DEV = 'SomeSecretKey123&', SECRET_KEY } = process.env;

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV !== 'production' ? SECRET_DEV : SECRET_KEY, { expiresIn: '7d' });
      res.cookie('token', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      });
      res.send({ token })
        .end();
    })
    .catch(next);
};

module.exports.register = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!email || !password) {
    next(new IncorrectDataError('Email или пароль не могут быть пустыми '));
  }

  bcrypt.hash(req.body.password, 10) // записываем данные в базу
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(201)
        .send({
          name: user.name,
          email: user.email,
        });
    })
    .catch((err) => { // если данные не записались, вернём ошибку
      if (err.name === 'ValidationError') {
        next(new IncorrectDataError('Произошла ошибка'));
      } else if (err.code === 11000) {
        next(new AlreayExistError('Пользователь уже существует'));
      } else {
        next(err);
      }
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('Запрашиваемый пользователь не найден'))
    .then((user) => { res.send(user); })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectDataError('Произошла ошибка'));
        return;
      }
      next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.send(user);
        return;
      }
      throw new NotFoundError('Запрашиваемый пользователь не найден');
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectDataError('Произошла ошибка'));
        return;
      }
      next(err);
    });
};

module.exports.signOut = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выполнен выход из аккаунта' });
};
