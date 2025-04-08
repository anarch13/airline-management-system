const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  flightno: { type: Number, required: true, unique: true },
  source:    { type: String, required: true },
  start_time: { type: String, required: true },
  date: { type: String, required: true},
  destination:    { type: String, required: true },
  end_time: { type: String, required: true },
  booking_ids: { type: [Number]},
  total_seats: { type: Number, required: true},
  remaining_seats: { type: Number},
  price: { type: Number, required: true},
});

module.exports = mongoose.model('flights', UserSchema);