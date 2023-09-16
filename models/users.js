const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const NotAuthError = require('../errors/not-auth-error');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Введите корректный email',
    },
    unique: true,
    required: true,
  },
  password: {
    type: String,
    validate: {
      validator: (password) => validator.isPassword(password),
      message: 'Минимальная длина пароля - 8 знаков',
    },
    required: true,
    select: false,
    hash: true,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new NotAuthError('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new NotAuthError('Неправильные почта или пароль');
          }
          return user; // аутентификация успешна
        });
    });
};

module.exports = mongoose.model('user', userSchema);
