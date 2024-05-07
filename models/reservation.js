const mongoose = require('mongoose');

/**
 * Schéma Mongoose pour les réservations.
 * @typedef {object} ReservationSchema
 * @property {number} catwayNumber - Le numéro du catway.
 * @property {string} clientName - Le nom du client.
 * @property {string} boatName - Le nom du bateau.
 * @property {string} CheckIn - L'heure d'arrivée.
 * @property {string} CheckOut - L'heure de départ.
 */

/**
 * Schéma Mongoose pour les réservations.
 * @type {ReservationSchema}
 */
const reservationchema = mongoose.Schema({
  catwayNumber: { type: Number, required: true },
  clientName: {type: String, require: true},
  boatName: {type: String, require: true},
  CheckIn: {type: String, require : true},
  CheckOut: {type: String, require : true},
});

module.exports = mongoose.model('Reservation', reservationchema);
