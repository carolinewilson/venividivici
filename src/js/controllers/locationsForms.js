angular.module('travelApp')
  .controller('LocationsEditController', LocationsEditController)
  .controller('LocationsNewController', LocationsNewController);

//////new
LocationsNewController.$inject = ['Location', '$state', '$auth'];

function LocationsNewController(Location, $state, $auth) {
  const locationsNew = this;
  locationsNew.location = {};

  function createLocation() {
    // set airport info
    const airport = locationsNew.location.airport.split(',');
    locationsNew.location.closestAirport = airport[0];
    locationsNew.location.airportCode = airport[1];

    // push images into array
    locationsNew.location.images = [locationsNew.location.tempImage.one, locationsNew.location.tempImage.two, locationsNew.location.tempImage.three, locationsNew.location.tempImage.four, locationsNew.location.tempImage.five];

    // get userId from paylod
    locationsNew.location.user = $auth.getPayload()._id;

    console.log(locationsNew.location);
    // Save location
    Location.save(locationsNew.location, () => {
      $state.go('home');
    });
  }
  locationsNew.createLocation = createLocation;
}

//edit
LocationsEditController.$inject = ['Location', '$state'];

function LocationsEditController(location, $state) {
  const locationsEdit = this;
  locationsEdit.location = location.get($state.params);

  function update() {
    location.update({ id: locationsEdit.location._id }, locationsEdit.location, () => {
      $state.go('login', $state.params);


    });
  }

  this.update = update;
}
