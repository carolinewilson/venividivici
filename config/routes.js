const router = require('express').Router();
const authController = require('../controllers/auth');
const users = require('../controllers/users');
const locations = require('../controllers/locations');
const secureRoute = require('../lib/secureRoute');

router
  .post('/login', authController.login)
  .post('/register', authController.register);

router.route('/users')
  .get(users.index)
  // .get(secureRoute, users.index)
  .post(users.create);

router.route('/users/:id')
  // .get(secureRoute, users.show)
  // .put(secureRoute, users.update)
  // .delete(secureRoute, users.delete);
  .get(users.show)
  .put(users.update)
  .delete(users.delete);

router.route('/locations')
  .get(locations.index)
  // .post(secureRoute, locations.create);
  .post(locations.create);

router.route('/locations/:id')
  .get(locations.show)
  // .put(secureRoute, locations.update)
  // .delete(secureRoute, locations.delete);
  .put(locations.update)
  .delete(locations.delete);

module.exports = router;
