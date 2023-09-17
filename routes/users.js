// импорт роута
const router = require('express').Router();

// импорт контроллеров
const {
  getCurrentUser, updateUser, register, login, signOut,
} = require('../controllers/users');

// импорт валидации
const {
  validateUpdateUser,
  validateRegister,
  validateLogin,
} = require('../middlewares/validate');

// роуты авторизованного пользователя
router.get('/me', getCurrentUser);
router.patch('/me', validateUpdateUser, updateUser);

// роуты регистрации, авторизации, выхода из аккаунта
router.post('/signup', validateRegister, register);
router.post('/signin', validateLogin, login);
router.post('/signout', signOut);

module.exports = router;
