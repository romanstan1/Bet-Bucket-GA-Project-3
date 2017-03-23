const router = require('express').Router();
const auth = require('../controllers/auth');
const secureRoute = require('../lib/secureRoute');

// to see that the routes and user work with the angular app
// all this does is hopefully show all users on a page, with no authentication.
router.route('/show')
  .get(secureRoute, auth.show);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
