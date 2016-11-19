angular.module('travelApp')
  .controller('ProfileShowController', ProfileShowController);

ProfileShowController.$inject = ['User', '$state', 'Trip', '$auth'];

function ProfileShowController(User, $state, Trip, $auth) {

  const profileShow = this;

  const profile = $auth.getPayload();
  console.log('-->', profile);
  profileShow.profile = User.get({ id: profile._id }, (user)=> {
    console.log(user);
    //going to find all the trips from 1 user id
    profileShow.trips = Trip.query({userId: user._id});
  });



  // console.log(profileId);

  // console.log(profileShow.user);

}
