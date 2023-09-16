const jwt = require('jsonwebtoken');
const NotAuthError = require('../errors/not-auth-error');

const { SECRET_KEY = 'SomeSecretKey123&' } = process.env;

module.exports.auth = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    next(new NotAuthError('Необходима авторизация'));
  }
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY); // попытаемся верифицировать токен
  } catch (err) {
    next(new NotAuthError('Необходима авторизация')); // отправим ошибку, если не получилось
  }

  req.user = payload; // записываем пейлоуд в объект запроса
  return next(); // пропускаем запрос дальше
};
