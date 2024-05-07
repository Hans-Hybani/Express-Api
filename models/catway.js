const mongoose = require('mongoose');

/**
 * Schéma Mongoose pour les catways.
 * @typedef {object} CatwaySchema
 * @property {number} catwayNumber - Le numéro du catway (unique).
 * @property {string} catwayState - L'état du catway.
 * @property {string} type - Le type de catway (long ou short).
 */

/**
 * Schéma Mongoose pour les catways.
 * @type {CatwaySchema}
 */
const catwaychema = mongoose.Schema({
  catwayNumber: { type: Number, required: true, unique: true },
  catwayState: { type: String, required: true },
  type: { type: String,enum: ['long', 'short'], required: true },
});

module.exports = mongoose.model('Catway', catwaychema);