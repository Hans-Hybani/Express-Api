const mongoose = require('mongoose');

const reservationchema = mongoose.Schema({
  catwayNumber: { type: Number, required: true },
  clientName: {type: String, require: true},
  boatName: {type: String, require: true},
  CheckIn: {type: String, require : true},
  CheckOut: {type: String, require : true},
});


module.exports = mongoose.model('Reservation', reservationchema);
