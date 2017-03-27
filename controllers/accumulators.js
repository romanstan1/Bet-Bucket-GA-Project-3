const Accumulator = require('../models/accumulator');
const User = require('../models/user');
const FakeData = require('../models/fakeData');

function showRoute(req, res, next) {
  Accumulator
  .findById(req.params.id)
  .exec()
  .then((response) => {

    return FakeData
      .find({ eventId: { $in: response.marketId }})
      .exec()
      .then((res) => res.json(res));
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

        console.log('new accy', accy);
        user.accumulators.push(accy);
        return user.save()
          .then(() => res.status(201).json(accy));
      });
    })
    .catch(next);
}


module.exports = {
  show: showRoute,
  create: createRoute
};
