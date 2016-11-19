angular.module('travelApp')
  .controller('LocationsShowController', LocationsShowController);

LocationsShowController.$inject = ['Location', '$state', 'User'];

function LocationsShowController(Location, $state, User) {
  const locationsShow = this;

  locationsShow.location = Location.get($state.params, (location) => {
    locationsShow.user = User.query({ _id: location.user});
  });



}
