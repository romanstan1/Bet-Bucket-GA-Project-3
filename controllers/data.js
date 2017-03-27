const FakeData = require('../models/fakeData');
//const User = require('../models/user');
const listEvents = require('../lib/betfairGetEvents');

function show(req, res, next) {
  console.log('responese here');
  return listEvents(req.token)
    .then((data) => {
      //console.log(response);
      console.log('responese here too');
      res.json(data);
    })

  //   .then((data) => res.json(data))
    .catch(next);
  //
  // .then((response) => {
  //   console.log(response);
  // })

  // FakeData
  //   .find()
  //   .exec()
  //   .then((data) => res.json(data))
  //   .catch(next);
}


module.exports = {
  show
};
