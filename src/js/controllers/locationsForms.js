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
    locationsNew.location.images = [locationsNew.location.tempImage.one, locationsNew.location.tempImage.two, locationsNew.location.tempImage.three, locationsNew.location.tempImage.four, locationsNew.location.tempImage.five];
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
      $state.go('home', $state.params);


    });
  }

  this.update = update;
}
