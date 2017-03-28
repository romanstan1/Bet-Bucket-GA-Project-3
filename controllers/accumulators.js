const Accumulator = require('../models/accumulator');
const User = require('../models/user');


function showRoute(req, res, next) {
  Accumulator
  .findById(req.params.id)
  .exec()
  .then(() => {
    console.log('fake data huehue');
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

function pushRoute(req, res, next) {
  const marketId = req.body;
  console.log(marketId);
  Accumulator
    .findById(req.params.id)
    .exec()
    .then((accumulator) => {
      if(!accumulator) return res.notFound();
      accumulator.marketId.push(req.body.marketId);
      return accumulator.save();
    })
    .then(() => res.status(200).end())
    .catch(next);
}

module.exports = {
  show: showRoute,
  create: createRoute,
  delete: deleteRoute,
  push: pushRoute
};
