angular.module('travelApp')
  .controller('RegisterController', RegisterController)
  .controller('LoginController', LoginController);

RegisterController.$inject = ['$auth', '$state', 'TripService','Trip'];
function RegisterController($auth, $state, TripService, Trip) {
  const register = this;

  register.user = {};

  function submit() {
    $auth.signup(register.user)
      .then((data) => {
        const tripData = TripService.getTrip();
        tripData.user = data.data.user._id;

        if (tripData) {
          Trip.save(tripData, (res) => {
            console.log('saved trip! ', res);
            TripService.deleteTrip();
          });
        }

        $state.go('home');
      });
  }

  register.submit = submit;
}

LoginController.$inject = ['$auth', '$state', 'TripService', 'Trip'];
function LoginController($auth, $state, TripService, Trip) {
  const login = this;

  login.credentials = {};

  function submit() {
    $auth.login(login.credentials)
      .then((data) => {

        const tripData = TripService.getTrip();
        tripData.user = data.data.user._id;

        if (tripData) {
          Trip.save(tripData, (res) => {
            console.log('saved trip! ', res);
            TripService.deleteTrip();
          });
        }

        $state.go('home');
      });
  }

  login.submit = submit;
}
