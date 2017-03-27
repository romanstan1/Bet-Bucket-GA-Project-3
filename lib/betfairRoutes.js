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

function getMarketOdds(token, marketId) {
  return rp({
    method: 'POST',
    url: 'https://api.betfair.com/exchange/betting/rest/v1.0/listMarketBook/',
    body: {
      'marketIds': [marketId],
      'priceProjection': {
        'priceData': ['EX_BEST_OFFERS', 'EX_TRADED'],
        'virtualise': 'true'
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

module.exports = {
  listEvents,
  listMarkets,
  getMarketOdds
};
