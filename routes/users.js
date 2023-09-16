const router = require('express').Router();
const {
  getCurrentUser, updateUser, register, login, signOut
} = require('../controllers/users');

const {
  validateUpdateUser,
  validateRegister,
  validateLogin,
} = require('../middlewares/validate');

router.get('/me', getCurrentUser);
router.patch('/me', validateUpdateUser, updateUser);

router.post('/signup', validateRegister, register);
router.post('/signin', validateLogin, login);
router.post('/signout', signOut);

module.exports = router;
