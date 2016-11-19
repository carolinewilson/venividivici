angular.module('travelApp')
  .controller('UsersShowController', UsersShowController);

UsersShowController.$inject = ['User', '$state', 'Trip'];

function UsersShowController(User, $state, Trip) {

  const usersShow = this;

  usersShow.user = User.get($state.params, (user)=> {
    //going to find all the trips from 1 user id
    usersShow.trips = Trip.query({userId: user._id});
  });



  // console.log(userId);

  // console.log(usersShow.user);

}
