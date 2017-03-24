const router = require('express').Router();
const secureRoute = require('../lib/secureRoute');
const auth = require('../controllers/auth');
const data = require('../controllers/data');
const rp = require('request-promise');

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

router.route('/betfair')
  .get((req, res) => {
    rp({
      method: 'POST',
      url: 'https://identitysso.betfair.com/api/login',
      form: {
        username: process.env.BETFAIR_USERNAME,
        password: process.env.BETFAIR_PASSWORD
      },
      headers: {
        'X-Application': 'a3qhFWoYSDGYX1t8',
        'Accept': 'application/json'
      },
      json: true
    })
    .then((response) => {
      console.log(response);
      console.log(response.token);
      res.end();
    });
  });
router.all('/*', (req, res) => res.notFound());

module.exports = router;
