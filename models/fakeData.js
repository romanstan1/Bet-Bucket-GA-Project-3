const mongoose = require('mongoose');

const fakeDataSchema = new mongoose.Schema({
  eventId: Number,
  eventName: String
});


module.exports = mongoose.model('FakeData', fakeDataSchema);
