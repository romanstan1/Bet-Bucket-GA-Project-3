const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { dbURI } = require('../config/environment');
mongoose.connect(dbURI);

const User = require('../models/user');
const Accumulator = require('../models/accumulator');
const FakeData = require('../models/fakeData');

User.collection.drop();
Accumulator.collection.drop();
FakeData.collection.drop();

Accumulator
  .create([{
    name: 'Weird Events',
    marketId: [8891, 10]
  }, {
    name: 'Best Events',
    marketId: [1, 500]
  }])
  .then((accy) => {
    console.log(`${accy.length} accies (accys?) created! Accy 1 is called ${accy[0].id}`);

    return User
      .create([{
        username: 'y',
        email: 'y@y',
        password: 'y',
        passwordConfirmation: 'y',
        accumulators: [accy[0], accy[1]]
      }]);
  })
  .then((users) => {
    console.log(`${users.length} users created, ${users[0].accumulators[0].name}`);

    return FakeData
      .create([{
        eventName: 'Trump Assassination',
        eventId: 10
      }, {
        eventName: 'Floyd vs Bugs Bunny',
        eventId: 8891
      }, {
        eventName: 'Ur Nan\'s Health',
        eventId: 1
      }, {
        eventName: 'Bogdabot Invasion',
        eventId: 500
      }]);
  })
  .then((events) => console.log(`${events.length} events created! ${events[0].id}`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
