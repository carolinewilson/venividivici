angular.module('travelApp')
  .controller('AdventurersShowController', AdventurersShowController);

AdventurersShowController.$inject = ['User', '$state', 'Location'];
function AdventurersShowController(User, $state, Location) {
  const adventurersShow = this;

  adventurersShow.user = User.get($state.params, (user)=> {
    // find all the locations with user id
    adventurersShow.locations = Location.query({userId: user._id});
  });

}
