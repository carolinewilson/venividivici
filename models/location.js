const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
  locationName: { type: String, required: true, unique: true },
  closestAirport: { type: String, required: true },
  mainImage: { type: String, required: true },
  images: [{ type: String }],
  attractions: [{ type: String }],
  bestTime: { type: String }
});

module.exports = mongoose.model('Location', locationSchema);
