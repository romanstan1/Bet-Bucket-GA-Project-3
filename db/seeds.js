const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { dbURI } = require('../config/environment');
mongoose.connect(dbURI);

const User = require('../models/user');
const Accumulator = require('../models/accumulator');


User.collection.drop();
Accumulator.collection.drop();


Accumulator
  .create([{
    name: 'Just Olympics'
  }, {
    name: 'Best Events'
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
  .then((users) => console.log(`${users.length} users created, ${users[0].accumulators[0].name}`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
