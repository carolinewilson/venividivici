angular.module('travelApp')
  .controller('LocationsIndexController', LocationsIndexController);

LocationsIndexController.$inject = ['Location'];
function LocationsIndexController(Location) {
  const locationsIndex = this;

  locationsIndex.all = Location.query();
}
