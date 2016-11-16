const mongoose = require('mongoose');
const db = require('../config/db');
const User = require('../models/user');
const Location  = require('../models/location');

mongoose.connect(db.uri);

Location.collection.drop();
User.collection.drop();

//return single data
Location.create({
  locationName: 'Kilimanjaro, Tanzania',
  closestAirport: 'TNZ',
  mainImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Mount_Kilimanjaro.jpg/1280px-Mount_Kilimanjaro.jpg',
  images: ['http://www.nationalgeographicexpeditions.com/assets/images/1761/itinerary-header.jpg', 'http://www.kili-tanzanitesafaris.com/Mount%20Kilimanjaro.jpg', 'http://www.wdwradio.com/wp-content/uploads/2014/12/kilimanjaro-safaris.jpg'],
  attractions: ['Safari', 'Waterfalls'],
  bestTime: 'January - February'
}, (err, location) => {
  if(err) return console.log('error creating a location', err);
  console.log('location created');

  User.create([{
    username: 'Gummy Bear',
    email: 'testing101@gmail.com',
    preferredAirport: 'LGW',
    password: 'password' ,
    passwordConfirmation: 'password',
    trips: [{
      location: location,
      startDate: '2017-01-01',
      startAirport: 'LHR',
      endAirport: 'TNZ',
      flightCost: 600,
      accomCost: 500,
      expenses: 1000,
      duration: 10,
      totalSavings: 10,
      totalCost: 2000
    }]
  }], (err, user) => {
    if(err) return console.log('error creating user', err);
    console.log('user created', user);

    mongoose.connection.close();

  });
});
