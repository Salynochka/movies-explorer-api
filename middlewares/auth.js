const jwt = require('jsonwebtoken');
const NotAuthError = require('../errors/not-auth-error');

const { SECRET_KEY = 'SomeSecretKey123&' } = process.env;

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new NotAuthError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY); // попытаемся верифицировать токен
  } catch (err) {
    throw new NotAuthError('Необходима авторизация'); // отправим ошибку, если не получилось
  }

  req.user = payload; // записываем пейлоуд в объект запроса
  return next(); // пропускаем запрос дальше
};
