const rp = require('request-promise');

function getEvents(req, res) {
  const baseUrl = 'https://api.betfair.com/exchange/betting/rest/v1.0/';

  rp({
    method: 'POST',
    url: `${baseUrl}listEvents/`,
    headers: {
      'X-Application': 'a3qhFWoYSDGYX1t8',
      'X-Authentication': 'n5a7gSphIRaIFPxmytzWhqctF0vZp7dYgLdKQtVUYfc=',
      'Content-Type': 'application/json'
    },
    body: {
      'filter': {
        'eventTypeIds': ['1'],
        'eventListStartTime': {
          'from': '2017-03-27T00:00:00Z',
          'to': '2017-04-27T23:59:00Z'
        }
      }
    },
    json: true
  })
    .then((response) => {
      res.status(200).json(response);
      console.log(response);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
}

module.exports = {
  getEvents
};
