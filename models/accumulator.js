const mongoose = require('mongoose');

const accumulatorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  marketId: [{ type: Number }]
});

module.exports = mongoose.model('Accumulator', accumulatorSchema);
