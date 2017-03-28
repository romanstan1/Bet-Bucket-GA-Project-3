const mongoose = require('mongoose');

const accumulatorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  marketId: [{ type: Number }]
});

module.exports = mongoose.model('Accumulator', accumulatorSchema);

// bobsAccy({
//   name: 'Shit Events',
//   marketId: [{ marketId: 1.432436, selectionId: 345345 }]
// });
