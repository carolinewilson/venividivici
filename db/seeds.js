const mongoose = require('mongoose');
const db = require('../config/db');
const User = require('../models/user');
const Location  = require('../models/location');
const Trip  = require('../models/trip');

mongoose.connect(db.uri);

Location.collection.drop();
User.collection.drop();
Trip.collection.drop();



User.create([{
  username: 'Gummy Bear',
  email: 'testing101@gmail.com',
  preferredAirport: 'LGW',
  profilePic: 'http://orig15.deviantart.net/3a07/f/2009/343/2/8/el_conquistador_by_wredwrat.jpg',
  password: 'password' ,
  passwordConfirmation: 'password'
}], (err, user) => {
  if(err) return console.log('error creating a user', err);
  const userId = user[0]._id;
  console.log(`${user.length} user created`);

  Location.create([{
    locationName: 'Kilimanjaro, Tanzania',
    user: userId,
    closestAirport: 'Kilimanjaro International Airport',
    airportCode: 'JRO',
    mainImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Mount_Kilimanjaro.jpg/1280px-Mount_Kilimanjaro.jpg',
    images: [
      'http://www.nationalgeographicexpeditions.com/assets/images/1761/itinerary-header.jpg',
      'http://www.kili-tanzanitesafaris.com/Mount%20Kilimanjaro.jpg',
      'http://www.wdwradio.com/wp-content/uploads/2014/12/kilimanjaro-safaris.jpg',
      'https://havecamerawilltravel.com/places/files/2016/10/mt-kilimanjaro-mt-kilimanjaro-stars-and-camp-at-lava-tower-54-copyright-havecamerawilltravel-com-1068x713.jpg',
      'http://static1.squarespace.com/static/51732308e4b0152c18ff09f1/t/5517a19fe4b04d5c319e3240/1427612067030/DSC_4802.jpg',
      'https://www.youtube.com/embed/-iY-6taCXcU'
    ],
    attractions: [
      'Safari',
      'Waterfalls'
    ],
    bestTime: 'January - February',
    description: 'At the heart of Mt Kilimanjaro National Park, one of Tanzania’s most visited parks, is the 5896m Mt Kilimanjaro, Africa’s highest mountain and one of the continent’s most magnificent sights. It’s also one of the highest volcanoes and the highest freestanding mountain in the world, rising from cultivated farmlands on the lower levels, through lush rainforest to alpine meadows, and finally across a barren lunar landscape to the twin summits of Kibo and Mawenzi. (Kilimanjaro’s third volcanic cone, Shira, is on the mountain’s western side.) The lower rainforest is home to many animals, including buffaloes, elephants, leopards and monkeys, and elands are occasionally seen in the saddle area between Kibo and Mawenzi.'
  },{
    locationName: 'Patagonia, Chile',
    user: userId,
    airportCode: 'PUQ',
    closestAirport: 'Presidente Carlos Ibáñez del Campo International Airport',
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
    bestTime: 'December - February',
    description: 'Pounding westerlies, barren seascapes and the ragged spires of Torres del Paine – this is the distilled essence of Patagonia. The provinces of Magallanes and Última Esperanza boast a frontier appeal perhaps only matched by the deep Amazon and remote Alaska. Long before humans arrived on the continent, glaciers chiseled and carved these fine landscapes. Now it\'s a place for travelers to hatch their greatest adventures, whether hiking through rugged landscapes, seeing penguins by the thousands or horseback riding across the steppe.'
  },{
    locationName: 'Kamchatka Ice Caves',
    airportCode: 'VVO',
    closestAirport: 'Vladivostok International Airport',
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
    bestTime: 'July - September',
    description: 'This surreal-looking ice cave is located on the Kamchatka Peninsula of Russia. The almost kilometer long tunnel was formed by a hot water spring flowing beneath the glacial ice fields on the flanks of the nearby Mutnovsky volcano. Because glaciers on Kamchatka volcanoes have been melting in recent years, the roof of this cave is now so thin that sunlight penetrates through it, eerily illuminating the icy structures within.'
  }], (err, locations) => {
    if(err) return console.log('error creating locations', err);
    console.log(`${locations.length} locations created`);

    Trip.create([{
      location: locations[0]._id,
      user: userId,
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

    }], (err, trips) => {
      if(err) return console.log('error creating trips: ', err);
      console.log(`${trips.length} trips created`);

      mongoose.connection.close();
    });
  });
});
