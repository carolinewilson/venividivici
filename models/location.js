const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
  locationName: { type: String, required: true, unique: true },
  closestAirport: { type: String, required: true },
  airportCode: { type: String },
  mainImage: { type: String, required: true },
  images: [{ type: String }],
  attractions: [{ type: String }],
  bestTime: { type: String },
  description: { type: String },
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Location', locationSchema);
