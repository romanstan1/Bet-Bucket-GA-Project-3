const betfairRoutes = require('../lib/betfairRoutes');

function listEvents(req, res, next) {
  return betfairRoutes.listEvents(global.betfairToken, req.query.eventTypeId)
    .then((data) => {
      res.json(data);
    })
    .catch(next);
}

function listMarkets(req, res, next) {
  return betfairRoutes.listMarkets(global.betfairToken, req.query.eventId)
    .then((data) => {
      res.json(data);
    })
    .catch(next);
}

function getMarketOdds(req, res, next) {
  return betfairRoutes.getMarketOdds(global.betfairToken, req.query.marketId)
    .then((data) => {
      res.json(data);
    })
    .catch(next);
}


module.exports = {
  listEvents,
  listMarkets,
  getMarketOdds
};
