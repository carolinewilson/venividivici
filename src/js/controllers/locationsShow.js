angular.module('travelApp')
  .controller('LocationsShowController', LocationsShowController);

LocationsShowController.$inject = ['Location', '$state', 'User','MapService'];

function LocationsShowController(Location, $state, User, MapService) {
  const locationsShow = this;

  Location.get($state.params, (location) => {
    locationsShow.location = location;
    locationsShow.user = User.query({ _id: location.user });
    locationsShow.center = {};
    locationsShow.featureImg = locationsShow.location.images[0];

    // Google Map
    MapService
      .getCoords(locationsShow.location.locationName)
      .then(res => {
        locationsShow.center = res;
      }, err => {
        console.log(err);
      });
  });


  function bigImage(image) {
    locationsShow.featureImg = image;
  }

  locationsShow.bigImage = bigImage;
}
