angular.module('travelApp')
  .controller('RegisterController', RegisterController)
  .controller('LoginController', LoginController);

RegisterController.$inject = ['$auth', '$state', '$window', 'User','TripService','Trip'];
function RegisterController($auth, $state, $window, User, TripService, Trip) {

  const register = this;

  register.user = {};

  function submit() {
    $auth
      .signup(register.user)
      .then((res) => {

        $window.localStorage.setItem('token', res.data.token);
        const payload = $auth.getPayload();
        $window.localStorage.setItem('userId', payload._id);

        const tripData = TripService.getTrip();

        if (tripData) {
          tripData.user = res.data.user._id;
          Trip.save(tripData, (res) => {
            console.log('saved trip! ', res);
            $state.go('usersShow');
          });
        }

        $state.go('home');
      });
  }

  register.submit = submit;
}

LoginController.$inject = ['$auth', '$state', '$window','TripService', 'Trip'];
function LoginController($auth, $state, $window, TripService, Trip) {

  const login = this;

  login.credentials = {};

  function submit() {
    $auth
      .login(login.credentials)
      .then((data) => {
        const payload = $auth.getPayload();
        $window.localStorage.setItem('userId', payload._id);

        const tripData = TripService.getTrip();
        tripData.user = data.data.user._id;

        if (tripData) {
          Trip.save(tripData, (res) => {
            console.log('saved trip! ', res);
            $state.go('usersShow');
          });
        }

        $state.go('home');
      });
  }

  login.submit = submit;
}
