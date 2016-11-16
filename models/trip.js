const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  location: { type: mongoose.Schema.ObjectId, ref: 'Location' },
  user: { type: mongoose.Schema.ObjectId, ref: 'User' },
  startDate: { type: Date },
  startAirport: { type: String },
  endAirport: { type: String },
  flightCost: { type: Number },
  accomCost: { type: Number },
  expenses: { type: Number },
  duration: { type: Number },
  totalSavings: { type: Number },
  totalCost: { type: Number }
});

module.exports = mongoose.model('Trip', tripSchema);
