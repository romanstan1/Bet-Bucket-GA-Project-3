const mongoose = require('mongoose');

const accumulatorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  events: [{
    eventName: String,
    marketName: String,
    marketId: String
  }]
});

module.exports = mongoose.model('Accumulator', accumulatorSchema);
