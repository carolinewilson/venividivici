angular.module('travelApp')
  .controller('LocationsShowController', LocationsShowController);

LocationsShowController.$inject = ['Location', '$state', 'User','MapService'];

function LocationsShowController(Location, $state, User, MapService) {
  const locationsShow = this;

  Location.get($state.params, (location) => {
    locationsShow.location = location;
    locationsShow.user = User.query({ _id: location.user});

    // Google Map
    console.log(locationsShow.location.locationName);
    MapService
      .getMap(locationsShow.location.locationName)
      .then(res => {
        locationsShow.map.center.latitude = res.lat;
        locationsShow.map.center.longitude = res.lng;
      }, err => {
        console.log(err);
      });
  });

  locationsShow.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };


}
