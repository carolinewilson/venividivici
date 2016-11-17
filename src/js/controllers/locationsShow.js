angular.module('travelApp')
  .controller('LocationsShowController', LocationsShowController);

LocationsShowController.$inject = ['Location', '$state'];

function LocationsShowController(Location, $state) {
  const locationsShow = this;

  locationsShow.location = Location.get($state.params);
  console.log(locationsShow.location);

}
