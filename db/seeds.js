const mongoose = require('mongoose');
const db = require('../config/db');
const User = require('../models/user');
const Location  = require('../models/location');
const Trip  = require('../models/trip');

mongoose.connect(db.uri);

Location.collection.drop();
User.collection.drop();
Trip.collection.drop();

Location.create([{
  locationName: 'Kilimanjaro, Tanzania',
  closestAirport: 'TNZ',
  mainImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Mount_Kilimanjaro.jpg/1280px-Mount_Kilimanjaro.jpg',
  images: [
    'http://www.nationalgeographicexpeditions.com/assets/images/1761/itinerary-header.jpg',
    'http://www.kili-tanzanitesafaris.com/Mount%20Kilimanjaro.jpg',
    'http://www.wdwradio.com/wp-content/uploads/2014/12/kilimanjaro-safaris.jpg',
    'https://havecamerawilltravel.com/places/files/2016/10/mt-kilimanjaro-mt-kilimanjaro-stars-and-camp-at-lava-tower-54-copyright-havecamerawilltravel-com-1068x713.jpg',
    'http://static1.squarespace.com/static/51732308e4b0152c18ff09f1/t/5517a19fe4b04d5c319e3240/1427612067030/DSC_4802.jpg'
  ],
  attractions: [
    'Safari',
    'Waterfalls'
  ],
  bestTime: 'January - February'
},{
  locationName: 'Patagonia, Chile',
  closestAirport: 'PUQ',
  mainImage: 'http://i.imgur.com/Y6qMZTX.jpg',
  images: [
    'http://www.knowmadadventures.com/wp-content/uploads/2013/06/tourist-sites-in-chile.jpg',
    'https://s-media-cache-ak0.pinimg.com/originals/b2/01/64/b20164db11285787efd6a8b74ace7010.jpg',
    'http://www.kevandemgoglobal.com/wp-content/uploads/2015/10/Marble-Caves-Chile-7.jpg',
    'http://www.lovethesepics.com/wp-content/uploads/2011/06/Patagonia-Chile-looks-like-something-off-a-postcard-.-.-.-or-out-of-a-dream.jpg',
    'http://miriadna.com/desctopwalls/images/max/Patagonia-(Chile).jpg'
  ],
  attractions: [
    'Parque Nacional Los Glaciares',
    'Reserva Faunística Península Valdés'
  ],
  bestTime: 'December - February'
},{
  locationName: 'Kamchatka Ice Caves',
  closestAirport: 'VVO',
  mainImage: 'http://www.56thparallel.com/wp-content/uploads/2015/12/Mutnovsky-Ice-cave-tour-Kamchatka-614x316.jpg',
  images: [
    'http://bow-businesstravel.com/wp-content/gallery/dont-miss-kamchatka/Ice-cave.jpeg',
    'http://selfiedestination.com/wp-content/uploads/2016/10/31-Kamchatka-Ice-Cave-Russia.jpg   ',
    'https://magingalagadngsining.files.wordpress.com/2015/10/6e04033e519120aafef753396380af53.jpg',
    'http://67.media.tumblr.com/a8dcfb5beb06a89ad94a643b9117924a/tumblr_ml5nmqaNnO1rw872io4_1280.jpg',
    'http://www.56thparallel.com/wp-content/uploads/2013/11/Russia-tours-to-Kamchatka-travel-Siberia-Far-East-56th-parallel.jpg'
  ],
  attractions: [
    'Volcanos'
  ],
  bestTime: 'July - September'
}], (err, locations) => {
  if(err) return console.log('error creating a location', err);
  console.log(`${locations.length} locations created`);

  const locationId = locations[0].id;

  User.create({
    username: 'Gummy Bear',
    email: 'testing101@gmail.com',
    preferredAirport: 'LGW',
    password: 'password' ,
    passwordConfirmation: 'password'
  }, (err, user) => {
    if(err) return console.log('error creating user', err);
    console.log('user created');

    Trip.create({
      location: locationId,
      user: user._id,
      departDate: '2017-01-01',
      returnDate: '2017-01-11',
      origin: 'LHR',
      destination: 'TNZ',
      flightCost: 600,
      accomCost: 300,
      expenses: 700,
      duration: 10,
      totalSavings: 100,
      totalCost: 1500

    }, (err, trip) => {
      if(err) return console.log('error creating trip: ', err);
      console.log('trip created', trip);

      mongoose.connection.close();
    });
  });
});
