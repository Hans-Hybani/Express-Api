const mongoose = require('mongoose');

const catwaychema = mongoose.Schema({
  catwayNumber: { type: Number, required: true, unique: true },
  catwayState: { type: String, required: true },
  type: { type: String,enum: ['long', 'short'], required: true },
});

module.exports = mongoose.model('Catway', catwaychema);