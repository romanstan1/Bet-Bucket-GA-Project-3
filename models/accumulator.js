const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventName: String,
  marketName: String,
  marketId: String,
  runnerName: String,
  runnerId: String
});

const accumulatorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  events: [ eventSchema ]
});

module.exports = mongoose.model('Accumulator', accumulatorSchema);
