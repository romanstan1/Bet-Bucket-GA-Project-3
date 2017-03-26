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


// function listEvents() {
//   //use event type Id (eg. 1= soccer) and date filter params to run this api to get list of events that meet the selection criteria
//   return rp({
//     method: 'POST',
//     url: 'https://api.betfair.com/exchange/betting/rest/v1.0/listEvents/',
//     body: {
//       'filter': {
//         'eventTypeIds': ['1'],
//         'eventListStartTime': {
//           'from': '2017-03-25T00:00:00Z',
//           'to': '2017-03-26T23:59:00Z'
//         }
//       }
//     },
//     headers: {
//       'X-Application': 'a3qhFWoYSDGYX1t8',
//       'X-Authentication': '51uz1qAn2jl76qHpE44Ou4BAG0wCAId1k9SjGeSg4Do=',
//       'Accept': 'application/json'
//     },
//     json: true
//   });
//
// }



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





// module.exports = {
//   listEvents,
//   betfairLogin
// };
