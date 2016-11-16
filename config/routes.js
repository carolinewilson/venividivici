const router = require('express').Router();
const authController = require('../controllers/auth');
const users = require('../controllers/users');
const locations = require('../controllers/locations');

router
  .post('/login', authController.login)
  .post('/register', authController.register);

router.route('/users')
  .get(users.index)
  .post(users.create);

router.route('/users/:id')
  .get(users.show)
  .put(users.update)
  .delete(users.delete);

router.route('/locations')
  .get(locations.index)
  .post(locations.create);

router.route('/locations/:id')
  .get(locations.show)
  .put(locations.update)
  .delete(locations.delete);

module.exports = router;
