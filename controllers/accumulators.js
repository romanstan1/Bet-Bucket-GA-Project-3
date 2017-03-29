const Accumulator = require('../models/accumulator');
const User = require('../models/user');
const betfairRoutes = require('../lib/betfairRoutes');


function showRoute(req, res, next) {
  Accumulator
  .findById(req.params.id)
  .exec()
  .then((response) => {
    const marketIds = response.events.map((event) => {
      return event.marketId;
    });
    console.log(marketIds);
  })
  .catch(next);
}

function createRoute(req, res, next) {

  req.body.createdBy = req.user;

  Accumulator
    .create(req.body)
    .then((accy) => {
      User.findById(req.user.id)
      .exec()
      .then((user) => {
        if(!user) return res.notFound();

        user.accumulators.push(accy);
        return user.save()
          .then(() => res.status(201).json(accy));
      });
    })
    .catch(next);
}

function deleteRoute(req, res, next) {
  Accumulator
    .findById(req.params.id)
    .exec()
    .then((accumulator) => {
      if(!accumulator) return res.notFound();

      return accumulator.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

function addEventRoute(req, res, next) {

  Accumulator
    .findById(req.params.id)
    .exec()
    .then((accumulator) => {
      if(!accumulator) return res.notFound();

      const event = accumulator.events.create(req.body);
      accumulator.events.push(event);

      return accumulator.save()
        .then(() => res.json(event));
    })
    .catch(next);
}

function deleteEventRoute(req, res, next) {
  Accumulator
    .findById(req.params.id)
    .exec()
    .then((accumulator) => {
      if(!accumulator) return res.notFound();

      const event = accumulator.events.id(req.params.eventId);
      event.remove();

      return accumulator.save();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  show: showRoute,
  create: createRoute,
  delete: deleteRoute,
  addEvent: addEventRoute,
  deleteEvent: deleteEventRoute
};
