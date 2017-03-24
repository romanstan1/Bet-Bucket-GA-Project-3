const FakeData = require('../models/fakeData');

function show(req, res, next) {
  FakeData
    .find()
    .exec()
    .then((data) => res.json(data))
    .catch(next);
}


module.exports = {
  show
};
