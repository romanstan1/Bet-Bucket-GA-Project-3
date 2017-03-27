const router = require('express').Router();
const secureRoute = require('../lib/secureRoute');
const auth = require('../controllers/auth');
const betfairData = require('../controllers/betfairData');
//const betfair = require('../controllers/betfair');

// const betfair = require('../lib/betfair');
const accy = require('../controllers/accumulators');

// to see that the routes and user work with the angular app
// all this does is hopefully show all users on a page, with no authentication.
router.route('/profile')
  .get(secureRoute, auth.profile);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.route('/listEvents')
  .get(betfairData.listEvents);

router.route('/listMarkets')
  .get(betfairData.listMarkets);

router.route('/marketOdds')
  .get(betfairData.getMarketOdds);

// betfair apis routes called from the front-end selections

// router.route('/getEvents')
//   .get(betfair.getEvents);
//
// router.route('/getMarketType')
//   .get(betfair.getMarketType);
//
// router.route('/getMarketData')
//   .get(betfair.getMarketData);

router.route('/accumulators/:id')
  .get(accy.show);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
