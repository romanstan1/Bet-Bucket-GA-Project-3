const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');
const betfairLogin = require('../lib/betfairLogin');

function profile(req, res, next) {
  User
    .findById(req.user.id)
    .populate('accumulators')
    .exec()
    .then((users) => res.json(users))
    .catch(next);
}

function register(req, res, next) {
  User
    .create(req.body)
    .then(() => res.json({ message: 'Registration successful'}))
    .catch(next);
}

function login(req, res, next) {
  console.log('Login route ');
  return betfairLogin()
    .then((response) => {
      console.log(response);
      global.betfairToken = response.token;
      console.log('global token', global.betfairToken);
      return User
        .findOne({ email: req.body.email });
    })
    .then((user) => {
      if(!user || !user.validatePassword(req.body.password)) return res.unauthorized();

      const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '5hr' });
      res.json({ token, message: `Welcome back ${user.username}` });
    })
    .catch(next);
}

module.exports = {
  profile,
  register,
  login
};
