const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const NotAuthError = require('../errors/not-auth-error');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'длина имени пользователя должна быть не менее 2 символов'],
    maxlength: [2, 'длина имени пользователя должна быть не более 30 символов'],
    required: [true, 'имя пользователя - обязательное поле'],
  },
  email: {
    type: String,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Введите корректный email',
    },
    unique: true,
    required: [true, 'email - обязательное поле'],
  },
  password: {
    type: String,
    required: [true, 'password - обязательное поле'],
    select: false,
    hash: true,
  },
}, { versionKey: false });

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
