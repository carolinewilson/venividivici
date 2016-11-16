const Trip = require('../models/trip');
const Location = require('../models/location');
const User = require('../models/user');

// INDEX
function tripsIndex(req, res) {
  Trip.find((err, trips) => {
    if(err) return res.status(500).json({ error: err });
    return res.json(trips);
  });
}
// CREATE
function tripsCreate(req, res) {
  Trip.create(req.body, (err, trip) => {
    if(err) return res.status(400).json({ error: err });
    return res.json(trip);
  });
}
// SHOW and search for referenced data. Searching for location & user within trip.
function tripsShow(req, res) {
  Trip.findById(req.params.id)
    .populate({
      path: 'location',
      model: Location
    })
    .populate({
      path: 'user',
      model: User
    })
    .exec((err, user) => {
      if(err) return res.status(500).json({ error: err });
      if(!user) return res.status(404).json({ error: 'Not found' });
      return res.json(user);
    });
}
// UPDATE
function tripsUpdate(req, res) {
  Trip.findById(req.params.id, (err, trip) => {
    if(err) return res.status(500).json({ error: err });
    if(!trip) return res.status(404).json({ error: 'Not found' });
    for(const key in req.body) {
      trip[key] = req.body[key];
    }
    trip.save((err, trip) => {
      if(err) return res.status(400).json({ error: err });
      res.json(trip);
    });
  });
}
// DELETE
function tripsDelete(req, res) {
  Trip.findById(req.params.id, (err, trip) => {
    if(err) return res.status(500).json({ error: err });
    if(!trip) return res.status(404).json({ error: 'Not found' });
    trip.remove(err => {
      if(err) return res.status(500).json({ error: err });
      res.status(204).send();
    });
  });
}
module.exports = {
  index: tripsIndex,
  create: tripsCreate,
  show: tripsShow,
  update: tripsUpdate,
  delete: tripsDelete
};
