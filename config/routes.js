const router = require('express').Router();
const authController = require('../controllers/auth');
const users = require('../controllers/users');
const locations = require('../controllers/locations');
const trips = require('../controllers/trips');
const skyscanner = require('../controllers/skyscanner');
const google = require('../controllers/googleMaps');
const secureRoute = require('../lib/secureRoute');
const oauthController = require('../controllers/oauth');

router
  .post('/login', authController.login)
  .post('/register', authController.register)
  .post('/auth/facebook', oauthController.facebook)
  .get('/flights', skyscanner.flights)
  .get('/maps', google.maps);


router.route('/users')
  .get(secureRoute, users.index);

router.route('/users/:id')
  .get(users.show)
  .put(secureRoute, users.update)
  .delete(secureRoute, users.delete);

router.route('/locations')
  .get(locations.index)
  .post(secureRoute, locations.create);

router.route('/locations/:id')
  .get(locations.show)
  .put(secureRoute, locations.update)
  .delete(secureRoute, locations.delete);

router.route('/trips')
  .get(secureRoute, trips.index)
  .post(secureRoute, trips.create);

router.route('/trips/:id')
  .get(secureRoute, trips.show)
  .put(secureRoute, trips.update)
  .delete(secureRoute, trips.delete);

module.exports = router;
