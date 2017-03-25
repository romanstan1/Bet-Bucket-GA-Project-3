const rp = require('request-promise');

function betfairLogin() {
  return rp({
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
  });
}

module.exports = betfairLogin;
