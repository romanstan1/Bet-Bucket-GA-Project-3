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
//works a darn treat^. returns object containing session token. Called in login on auth.js


//these api functions below are called via routes.js
// function getEvent() {
//   //use event type Id (eg. 1= soccer) and data filter params to run this api to get list of events that meet the selection criteria
// }
// function viewMarkets() {
//   // select event eg. Manu vs Chelsea to view
// }
// function getMarketData() {
//   //use market id to retrive odds. This is the api that will be requested on a loop
// }
//
//


module.exports = betfairLogin;
