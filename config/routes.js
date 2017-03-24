const router = require('express').Router();
const secureRoute = require('../lib/secureRoute');
const auth = require('../controllers/auth');
const data = require('../controllers/data');

// to see that the routes and user work with the angular app
// all this does is hopefully show all users on a page, with no authentication.
router.route('/profile')
  .get(secureRoute, auth.profile);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.route('/data')
  .get(data.show);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
