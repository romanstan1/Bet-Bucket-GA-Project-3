const rp = require('request-promise');

function listEvents(token, eventTypeId, startDate, endDate) {
  //use event type Id (eg. 1= soccer) and date filter params to run this api to get list of events that meet the selection criteria
  console.log('\x1b[31m', token);
  return rp({
    method: 'POST',
    url: 'https://api.betfair.com/exchange/betting/rest/v1.0/listEvents/',
    body: {
      'filter': {
        'eventTypeIds': [eventTypeId],
        'eventListStartTime': {
          'from': startDate,
          'to': endDate
        }
      }
    },
    headers: {
      'X-Application': 'a3qhFWoYSDGYX1t8',
      'X-Authentication': `${token}`,
      'Accept': 'application/json'
    },
    json: true
  });

}

function listMarkets(token, eventId) {
  //use event type Id (eg. 1= soccer) and date filter params to run this api to get list of events that meet the selection criteria
  console.log('\x1b[31m', token);
  return rp({
    method: 'POST',
    url: 'https://api.betfair.com/exchange/betting/rest/v1.0/listMarketCatalogue/',
    body: {
      'filter': {
        'eventIds': [eventId]
      },
      'maxResults': '200',
      'marketProjection': [
        'COMPETITION',
        'EVENT',
        'EVENT_TYPE',
        'RUNNER_DESCRIPTION',
        'RUNNER_METADATA',
        'MARKET_START_TIME'
      ]
    },
    headers: {
      'X-Application': 'a3qhFWoYSDGYX1t8',
      'X-Authentication': `${token}`,
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


module.exports = {
  listEvents,
  listMarkets
};
