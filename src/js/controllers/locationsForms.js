angular.module('travelApp')
  .controller('LocationsEditController', LocationsEditController)
  .controller('LocationsNewController', LocationsNewController);

//////new
LocationsNewController.$inject = ['Location', '$state', '$auth'];

function LocationsNewController(Location, $state, $auth) {
  const locationsNew = this;
  const currentUser = $auth.getPayload()._id;
  locationsNew.location = {
    tempImage: {}
  };
  locationsNew.location.user = currentUser;

  function createLocation() {
    // set airport info
    const airport = locationsNew.location.airport.split(',');
    locationsNew.location.closestAirport = airport[0];
    locationsNew.location.airportCode = airport[1];

    // push images into array
    locationsNew.location.images = [locationsNew.location.tempImage.one, locationsNew.location.tempImage.two, locationsNew.location.tempImage.three, locationsNew.location.tempImage.four, locationsNew.location.tempImage.five];

    // get userId from paylod
    locationsNew.location.user = $auth.getPayload()._id;

    // console.log(locationsNew.location);
    // Save location
    Location.save(locationsNew.location, (location) => {
      $state.go('locationsShow', { id: location._id });
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
    // set airport info
    if (locationsEdit.location.airport) {
      const airport = locationsEdit.location.airport.split(',');
      locationsEdit.location.closestAirport = airport[0];
      locationsEdit.location.airportCode = airport[1];
    }
    // push images into array
    locationsEdit.location.images = [locationsEdit.location.images[0], locationsEdit.location.images[1], locationsEdit.location.images[2], locationsEdit.location.images[3], locationsEdit.location.images[4]];

    location.update({ id: locationsEdit.location._id }, locationsEdit.location, () => {
      $state.go('locationsShow', $state.params);
    });
  }

  this.update = update;
}
