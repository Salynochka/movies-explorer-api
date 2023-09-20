// импорт роута
const router = require('express').Router();

// импорт контроллеров
const {
  getCurrentUser, updateUser,
} = require('../controllers/users');

// импорт валидации
const {
  validateUpdateUser,
  validateUserId,
} = require('../middlewares/validate');

// роуты авторизованного пользователя
router.get('/me', validateUserId, getCurrentUser);
router.patch('/me', validateUpdateUser, updateUser);

module.exports = router;
