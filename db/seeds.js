const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');
const User = require('../models/user');

mongoose.connect(dbURI);


User
  .create([{
    email: 'y@y',
    username: 'y',
    password: 'y',
    passwordConfirmation: 'y'
  }])
  .then((users) => console.log(`${users.length} users created! Email is ${users[0].email} & password is 'y'`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
