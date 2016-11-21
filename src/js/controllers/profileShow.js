angular.module('travelApp')
  .controller('ProfileShowController', ProfileShowController);

ProfileShowController.$inject = ['User', '$state', 'Trip', '$auth', 'Location'];

function ProfileShowController(User, $state, Trip, $auth, Location) {

  const profileShow = this;

  const profile = $auth.getPayload();
  console.log('-->', profile);
  profileShow.profile = User.get({ id: profile._id }, (user)=> {
    console.log('user--->', user);
    //going to find all the trips from 1 user id
    profileShow.trips = Trip.query({userId: user._id});
    profileShow.locations = Location.query({user: user._id});
  });


}
