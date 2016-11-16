const router = require('express').Router();
const authController = require('../controllers/auth');
const users = require('../controllers/users');

router
  .post('/login', authController.login)
  .post('/register', authController.register);

router.route('/users')
  .get(users.index)
  .post(users.create);

module.exports = router;
