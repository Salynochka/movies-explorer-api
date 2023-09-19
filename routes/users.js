// импорт роута
const router = require('express').Router();

// импорт контроллеров
const {
  getCurrentUser, updateUser,
} = require('../controllers/users');

// импорт валидации
const {
  validateUpdateUser,
} = require('../middlewares/validate');

// роуты авторизованного пользователя
router.get('/me', getCurrentUser);
router.patch('/me', validateUpdateUser, updateUser);

module.exports = router;
