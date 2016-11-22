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
  username: 'Caroline',
  email: 'caroline@gmail.com',
  preferredAirport: 'LGW',
  profilePic: 'http://orig15.deviantart.net/3a07/f/2009/343/2/8/el_conquistador_by_wredwrat.jpg',
  password: 'password' ,
  passwordConfirmation: 'password'
},{
  username: 'Dara',
  email: 'dara@gmail.com',
  preferredAirport: 'LGW',
  profilePic: 'http://orig15.deviantart.net/3a07/f/2009/343/2/8/el_conquistador_by_wredwrat.jpg',
  password: 'password' ,
  passwordConfirmation: 'password'
},{
  username: 'Marco',
  email: 'marco@gmail.com',
  preferredAirport: 'LGW',
  profilePic: 'http://orig15.deviantart.net/3a07/f/2009/343/2/8/el_conquistador_by_wredwrat.jpg',
  password: 'password' ,
  passwordConfirmation: 'password'
}], (err, user) => {
  if(err) return console.log('error creating a user', err);
  const userId1 = user[0]._id;
  const userId2 = user[1]._id;
  const userId3 = user[2]._id;
  console.log(`${user.length} user created`);

  Location.create([{
    locationName: 'Kilimanjaro, Tanzania',
    user: userId1,
    closestAirport: 'Kilimanjaro International Airport',
    airportCode: 'JRO',
    mainImage: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Uhuru_Peak_Mt._Kilimanjaro_2.JPG',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Mount_Kilimanjaro.jpg/1280px-Mount_Kilimanjaro.jpg',
      'http://www.nationalgeographicexpeditions.com/assets/images/1761/itinerary-header.jpg',
      'http://www.kili-tanzanitesafaris.com/Mount%20Kilimanjaro.jpg',
      'http://www.wdwradio.com/wp-content/uploads/2014/12/kilimanjaro-safaris.jpg',
      '../../images/kilimanjaro_camping.jpg'
    ],
    attractions: [
      'Safari, Waterfalls'
    ],
    bestTime: 'January - February',
    description: 'At the heart of Mt Kilimanjaro National Park, one of Tanzania’s most visited parks, is the 5896m Mt Kilimanjaro, Africa’s highest mountain and one of the continent’s most magnificent sights. It’s also one of the highest volcanoes and the highest freestanding mountain in the world, rising from cultivated farmlands on the lower levels, through lush rainforest to alpine meadows, and finally across a barren lunar landscape to the twin summits of Kibo and Mawenzi. (Kilimanjaro’s third volcanic cone, Shira, is on the mountain’s western side.) The lower rainforest is home to many animals, including buffaloes, elephants, leopards and monkeys, and elands are occasionally seen in the saddle area between Kibo and Mawenzi.'
  },{
    locationName: 'Patagonia, Chile',
    user: userId2,
    airportCode: 'PUQ',
    closestAirport: 'Presidente Carlos Ibáñez del Campo International Airport',
    mainImage: 'http://i.imgur.com/Y6qMZTX.jpg',
    images: [
      'http://www.kevandemgoglobal.com/wp-content/uploads/2015/10/Marble-Caves-Chile-7.jpg',
      'https://s-media-cache-ak0.pinimg.com/originals/b2/01/64/b20164db11285787efd6a8b74ace7010.jpg',
      '../../images/patagonia.jpeg',
      'http://www.lovethesepics.com/wp-content/uploads/2011/06/Patagonia-Chile-looks-like-something-off-a-postcard-.-.-.-or-out-of-a-dream.jpg',
      'http://www.knowmadadventures.com/wp-content/uploads/2013/06/tourist-sites-in-chile.jpg'
    ],
    attractions: [
      'Parque Nacional Los Glaciares, Reserva Faunística Península Valdés'
    ],
    bestTime: 'December - February',
    description: 'Pounding westerlies, barren seascapes and the ragged spires of Torres del Paine – this is the distilled essence of Patagonia. The provinces of Magallanes and Última Esperanza boast a frontier appeal perhaps only matched by the deep Amazon and remote Alaska. Long before humans arrived on the continent, glaciers chiseled and carved these fine landscapes. Now it\'s a place for travelers to hatch their greatest adventures, whether hiking through rugged landscapes, seeing penguins by the thousands or horseback riding across the steppe.'
  },{
    locationName: 'Kamchatka Peninsula',
    user: userId3,
    airportCode: 'VVO',
    closestAirport: 'Vladivostok International Airport',
    mainImage: 'https://c2.staticflickr.com/8/7569/15827512311_c35380bd6b_b.jpg',
    images: [
      'http://bow-businesstravel.com/wp-content/gallery/dont-miss-kamchatka/Ice-cave.jpeg',
      'http://selfiedestination.com/wp-content/uploads/2016/10/31-Kamchatka-Ice-Cave-Russia.jpg   ',
      'https://magingalagadngsining.files.wordpress.com/2015/10/6e04033e519120aafef753396380af53.jpg',
      'http://67.media.tumblr.com/a8dcfb5beb06a89ad94a643b9117924a/tumblr_ml5nmqaNnO1rw872io4_1280.jpg',
      'http://www.56thparallel.com/wp-content/uploads/2015/12/Mutnovsky-Ice-cave-tour-Kamchatka-614x316.jpg'
    ],
    attractions: [
      'Volcanos, Kamchatka Ice Caves'
    ],
    bestTime: 'July - September',
    description: 'This surreal-looking ice cave is located on the Kamchatka Peninsula of Russia. The almost kilometer long tunnel was formed by a hot water spring flowing beneath the glacial ice fields on the flanks of the nearby Mutnovsky volcano. Because glaciers on Kamchatka volcanoes have been melting in recent years, the roof of this cave is now so thin that sunlight penetrates through it, eerily illuminating the icy structures within.'
  },{
    locationName: 'Praia da Marinha, Portugal',
    user: userId2,
    closestAirport: 'Faro Airport',
    airportCode: 'FAO',
    mainImage: '../../images/praia-da-marinha.jpg',
    images: [
      'http://viralaholic.com/wp-content/uploads/2016/02/a5d4e5fc45b23249c145b1c5eea5291e.jpg',
      'http://3.bp.blogspot.com/-48RFfRpcL8o/VDV-bXHQjfI/AAAAAAAAGtg/Cu0RTuG8c3U/s1600/Heart-Sea-Arch-Portugal.jpg',
      'http://www.messagez.com/wp-content/gallery/portugal/the-algarve-paradise-entrance-photography-by-messagez-com_.jpg',
      'http://www.messagez.com/wp-content/gallery/portugal/the-heart-of-algarve-portugal-photography-2-by-messagez-com_.jpg',
      'http://seepicz.com/wp-content/uploads/2013/09/f12525828f4833e6657ed20c290007c7.jpg',
      'http://seepicz.com/wp-content/uploads/2013/12/aeea73be78ddb60e88fb3ac46e6b82b6.jpg'
    ],
    attractions: [
      'Natural rock formations'
    ],
    bestTime: 'June - September',
    description: 'Praia da Marinha is one of the most emblematic and beautiful beaches of Portugal, located on the Atlantic coast in Caramujeira, Lagoa Municipality, Algarve, and considered by the Michelin Guide as one of the 10 most beautiful beaches in Europe and as one of the 100 most beautiful beaches in the world. In 1998, it was also awarded with the distinguished "Golden Beach" award by the Portuguese Ministry of the Environment because of its outstanding natural qualities. Furthermore, many pictures of this beach have often been used in promotional material and "Guides of Portugal" distributed around the world.'
  },{
    locationName: 'Moscow, Russia',
    user: userId2,
    closestAirport: 'Domodedovo International Airport',
    airportCode: 'DME',
    mainImage: 'http://hdpic.org/wp-content/uploads/2015/02/Moscow-Red-Square-Cool-Background-Beautiful-Free-Wallpaper.jpg',
    images: [
      'https://s-media-cache-ak0.pinimg.com/originals/a5/f9/fb/a5f9fb5ce7d9e003656ccd776874326e.jpg',
      'https://cache-graphicslib.viator.com/graphicslib/thumbs674x446/5807/SITours/private-walking-tour-moscow-including-the-kremlin-in-moscow-123597.jpg',
      'http://www.telegraph.co.uk/content/dam/Travel/leadAssets/24/44/Moscow_2444972a-large.jpg',
      'https://kremlintour.com/sites/default/files/grand-kremlin-palace-interior-andreyevsky-hall.jpg',
      'http://www.angelfire.com/pa/ImperialRussian/news/images/k16.jpg',
      ''
    ],
    attractions: [
      'St Basil\'s Cathedral, Red Square, Kremlin, Kolomenskoye'
    ],
    bestTime: 'September - October',
    description: 'At the southern end of Red Square stands the icon of Russia: St Basil’s Cathedral. This crazy confusion of colours, patterns and shapes is the culmination of a style that is unique to Russian architecture. In 1552 Ivan the Terrible captured the Tatar stronghold of Kazan on the Feast of Intercession. He commissioned this landmark church, officially the Intercession Cathedral, to commemorate the victory. Created from 1555 to 1561, this masterpiece would become the ultimate symbol of Russia.'
  },{
    locationName: 'Santorini, Greece',
    user: userId3,
    closestAirport: 'Santorini (Thira) National Airport',
    airportCode: 'JTR',
    mainImage: 'http://athensgreecenow.com/_imagery/2015-05-28/Oia-Santorini-Greece-Europe-980.jpg',
    images: [
      'http://newmedia.thomson.co.uk/live/vol/2/64d817a84d630cab43a5ac6b79fa6fba0afa8265/1080x608/web/EUROPEMEDITERRANEANGREECESANTORINIDES_000939OIARES_003226.jpg',
      'http://farm8.staticflickr.com/7455/10972582665_df3dfc9da0_z.jpg',
      'http://newmedia.thomson.co.uk/live/vol/2/52cc3f6fec397e0666e1db66a520003376ad3fdd/1080x608/web/EUROPEMEDITERRANEANGREECESANTORINIDES_000939IMEROVIGLI.jpg',
      'http://www.fomithea.com/wp-content/uploads/2011/09/santorini-greece-photo-4.jpg',
      'http://bb901.com/wp-content/uploads/2014/10/Santorini-Greece-22-Jan-post.jpg',
      'http://cdni.condenast.co.uk/646x430/s_v/santorini_cnt_18nov09_iStock_b_1.jpg'
    ],
    attractions: [
      'Beaches, Boutiques, Sunsets'
    ],
    bestTime: 'April to September',
    description: 'Santorini is the most popular island in Greece. It may be the most popular island in the world. There are few travel destinations that combine beautiful beaches, spectacular scenery, ancient cities, amazing restaurants, some of the world\'s best wine, and an active volcano. But Santorini has all this and more.'
  },{
    locationName: 'Grindavík, Iceland',
    user: userId1,
    closestAirport: 'Keflavik International Airport',
    airportCode: 'KEF',
    mainImage: 'http://www.bluelagoon.com/images/new-node/blue-lagoon-price.jpg',
    images: [
      'http://www.amazingplacesonearth.com/wp-content/uploads/2014/11/Blue-Lagoon.jpg',
      'http://cdn.lightgalleries.net/4d9f494ad02b8/images/photographer-burlington-vermont-vt-assignment-commercial-photojournalist-monica-donovan-places-01IMG_5974-1.jpg',
      'http://imgc.allpostersimages.com/images/P-473-488-90/27/2791/CCGOD00Z/posters/people-swim-in-the-blue-lagoon-spa-in-grindavik-iceland.jpg',
      'http://www.traveleralmanac.com/wp-content/uploads/2016/01/Blue-Lagoon-Iceland-1024x682.jpg',
      'http://www.thegoldenscope.com/wp-content/uploads/2014/02/fjallsc3a1rlc3b3n-glacier-lake-iceland-resized.jpg'
    ],
    attractions: [
      'Blue Lagoon Thermal Pools, Stunning landscapes'
    ],
    bestTime: 'June to August',
    description: 'Grindavík is a fishing town at the Southern Peninsula at the southwest coast of Iceland. It is one of the few cities with a harbour at this coast. Most of the inhabitants work in the fishing industry. The Blue Lagoon, Grindavík\'s premiere attraction, is located 3 miles from the town centre. '
  },{
    locationName: 'Siem Reap, Cambodia',
    user: userId1,
    closestAirport: 'Siem Reap International Airport',
    airportCode: 'REP',
    mainImage: 'http://www.trazeetravel.com/wp-content/uploads/2015/03/Angkor-Wat-Siem-Reap-Cambodia-%C2%A9-Lakhesis-Dreamstime1.jpg',
    images: [
      'http://cdn4.i-scmp.com/sites/default/files/styles/landscape/public/images/methode/2016/08/11/0dd04594-5d2b-11e6-82a1-e6803dbb30ea_1280x720.jpg?itok=eO9dtMoc',
      'http://static.asiawebdirect.com/m/bangkok/portals/cambodia/homepage/angkor-wat/allParagraphs/0110/image/angkor-wat-gate.jpg',
      'http://s.ngm.com/2009/07/angkor/img/01-angkor-wat-615.jpg',
      'https://images2.alphacoders.com/481/481029.jpg',
      'http://www.treybarrow.com/Angkor%20Wat,%20Cambodia/photos/1%20Angkor%20Wat.jpg'
    ],
    attractions: [
      'Angkor Wat, Temples, Architecture'
    ],
    bestTime: 'Year round',
    description: 'Angkor is one of the most important archaeological sites in South-East Asia. Stretching over some 400 km2, including forested area, Angkor Archaeological Park contains the magnificent remains of the different capitals of the Khmer Empire, from the 9th to the 15th century. They include the famous Temple of Angkor Wat and, at Angkor Thom, the Bayon Temple with its countless sculptural decorations.'
  },{
    locationName: 'Farafra, Egypt',
    user: userId2,
    closestAirport: 'Cairo International Airport',
    airportCode: 'CAI',
    mainImage: 'http://4.bp.blogspot.com/-1M77CUpsnDc/U00rHCnQ2KI/AAAAAAAAuWs/1al_uBHJBSY/s1600/white+desert+egypt+2.jpg',
    images: [
      'http://whenonearth.net/wp-content/uploads/2014/09/332146xcitefun-white-desert-3.jpg',
      'http://elitetourclub.com/blog/wp-content/uploads/2012/04/White-Black-Desert-1.jpg',
      'http://www.willgoto.com/pictures/b/Egypt_White_Desert_in_the_Western_Desert.jpg',
      'http://whenonearth.net/wp-content/uploads/2014/09/The-White-Desert.jpg',
      'http://www.willgoto.com/images/Size3/Egypt_Farafra_White_desert_Desert_blanc_02_3029aea2dea84e19ba73954ae8bd46a1.jpg'
    ],
    attractions: [
      'White Desert, Camping under the stars'
    ],
    bestTime: 'Year round',
    description: 'Farafra Oasis is renowned for its White Desert, which many tourists visit on safaris from Bahariya rather than from the oasis “capital”, Qasr al-Farafra, a one-horse town if ever there was. Historically, Farafra was the least populous and most isolated of the four oases. When camels were the only means of travel, the Farafrans had less contact with Bahariya (a journey of four days) than with Dakhla, which was tenuously connected to the Forty Days Road. Fakhry relates how the villagers once lost track of time and could only ascertain the right day for Friday prayers by sending a rider to Dakhla.'
  },{
    locationName: 'Paria Canyon, Utah',
    user: userId3,
    closestAirport: 'Salt Lake City',
    airportCode: 'SLC',
    mainImage: 'http://onlyfreewallpaper.com/walls/paria-canyon-wide.jpg',
    images: [
      'https://s-media-cache-ak0.pinimg.com/originals/e2/2f/6a/e22f6a0a299c34cb9839174e98b6b30c.jpg',
      'http://www.dreamlandtours.net/wp-content/uploads/2012/01/Dolly-Rock.jpg',
      'https://mowryjournal.files.wordpress.com/2015/02/coyote-buttes.jpg?w=1000&h=667',
      'http://photos2.meetupstatic.com/photos/event/1/3/8/600_319860312.jpeg',
      'https://media.deseretdigital.com/file/73781d3667?crop=top:0|left:0|width:1260|height:670|gravity:Center&quality=55&resize=width:1260&order=resize,crop&c=14&a=4021ecc8'
    ],
    attractions: [
      'Dolly Rock'
    ],
    bestTime: 'September to June',
    description: 'Nationally known for its beauty, the Paria Canyon has towering walls streaked with desert varnish, huge red rock amphitheaters, sandstone arches, wooded terraces, and hanging gardens. The 3,000-foot escarpment known as the Vermilion Cliffs dominates the remainder of the wilderness with its thick Navajo sandstone face, steep, boulder-strewn slopes, rugged arroyos and stark overall appearance. Some of the best slot canyon hiking opportunities on the Colorado Plateau are found here. Deer and desert bighorn sheep inhabit the area.'
  },{
    locationName: 'Petra, Jordan',
    user: userId1,
    closestAirport: 'Amman',
    airportCode: 'AMM',
    mainImage: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Petra_Monastary.jpg',
    images: [
      'https://c2.staticflickr.com/4/3597/3483325690_ae3773d0c0_b.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/0/0f/Petra-9.JPG',
      'https://c1.staticflickr.com/3/2106/5748356313_e3d389c8d4_b.jpg ',
      'https://c1.staticflickr.com/3/2814/12302529396_bdf00af33e_b.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/6/61/The_monastery_in_petra_jordan-other.jpg'
    ],
    attractions: [
      'Ancient city, Tombs'
    ],
    bestTime: 'March – May',
    description: 'A city of rose-coloured stone, carved out of Mount Hor’s rock-face by the Nabataeans in the 3rd century BC, there’s nothing else like Petra. If it’s not on your bucket list already, it really should be.'
  }], (err, locations) => {
    if(err) return console.log('error creating locations', err);
    console.log(`${locations.length} locations created`);

    Trip.create([{
      location: locations[0]._id,
      user: userId1,
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
