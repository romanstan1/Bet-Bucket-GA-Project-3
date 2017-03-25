const Accumulator = require('../models/accumulator');
const FakeData = require('../models/fakeData');

function show(req, res, next) {
  Accumulator
  .findById(req.params.id)
  .exec()
  .then((response) => {

    return FakeData
      .find({ eventId: { $in: response.marketId }})
      .exec()
      .then((kek) => res.json(kek));
  })
  .catch(next);
}


module.exports = {
  show
};
