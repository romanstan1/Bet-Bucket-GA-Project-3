const rp = require('request-promise');

function listEvents(token, eventTypeId) {
  //use event type Id (eg. 1= soccer) and date filter params to run this api to get list of events that meet the selection criteria
  console.log(token);
  return rp({
    method: 'POST',
    url: 'https://api.betfair.com/exchange/betting/rest/v1.0/listEvents/',
    body: {
      'filter': {
        'eventTypeIds': [eventTypeId]
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
  return rp({
    method: 'POST',
    url: 'https://api.betfair.com/exchange/betting/rest/v1.0/listMarketCatalogue/',
    body: {
      'filter': {
        'eventIds': [eventId]
      },
      'maxResults': '10',
      'marketSort': [
        'MINIMUM_TRADED',
        'FIRST_TO_START'
      ],
      'MarketBettingType': [
        'ODDS'
      ],
      'orderBy': [
        'BY_MATCH_TIME'
      ],
      'marketProjection': [
        'MARKET_START_TIME',
        'RUNNER_DESCRIPTION'
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
        'priceData': ['SP_TRADED', 'EX_TRADED'],
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

function getAccumulatorOdds(token, marketIds) {
  return rp({
    method: 'POST',
    url: 'https://api.betfair.com/exchange/betting/rest/v1.0/listMarketBook/',
    body: {
      'marketIds': marketIds,
      'priceProjection': {
        'priceData': ['SP_TRADED', 'EX_TRADED'],
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
  getMarketOdds,
  getAccumulatorOdds
};
