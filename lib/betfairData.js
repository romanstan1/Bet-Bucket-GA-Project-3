const rp = require('request-promise');


function listEvents() {
  //use event type Id (eg. 1= soccer) and date filter params to run this api to get list of events that meet the selection criteria
  return rp({
    method: 'POST',
    url: 'https://api.betfair.com/exchange/betting/rest/v1.0/listEvents/',
    body: {
      'filter': {
        'eventTypeIds': ['1'],
        'eventListStartTime': {
          'from': '2017-03-25T00:00:00Z',
          'to': '2017-03-26T23:59:00Z'
        }
      }
    },
    headers: {
      'X-Application': 'a3qhFWoYSDGYX1t8',
      'X-Authentication': '9HXa2CqQh77aGffaEUB4cAmb0EVJHCqP/ggpgkTDnmg=',
      'Accept': 'application/json'
    },
    json: true
  });
}



module.exports = {
  listEvents
};
