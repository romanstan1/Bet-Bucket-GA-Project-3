//const FakeData = require('../models/fakeData');
//const User = require('../models/user');
const betfairRoutes = require('../lib/betfairRoutes');

function show(req, res, next) {
  console.log('responese here');
  return betfairRoutes.listEvents(global.betfairToken, req.query.eventTypeId, req.query.startDate, req.query.endDate)
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
