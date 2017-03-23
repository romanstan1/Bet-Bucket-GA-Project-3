const User = require('../models/user');

function showStuff(req, res, next) {
  User
    .find()
    .exec()
    .then((users) => res.json(users))
    .catch(next);
}


module.exports = {
  show: showStuff
};
