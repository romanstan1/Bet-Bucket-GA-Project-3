const router = require('express').Router();
const auth = require('../controllers/auth');

// to see that the routes and user work with the angular app
// all this does is hopefully show all users on a page, with no authentication.
router.get('/show', auth.show);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
