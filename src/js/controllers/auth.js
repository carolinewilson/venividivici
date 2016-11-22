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
          Trip.save(tripData, () => {
            // console.log('saved trip! ', res);
          });
          return $state.go('usersShow', { id: res.data.user._id });
        }
        register.err = false;

        $state.go('home');
      }, err => {
        console.log(err);
        register.err = true;
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
        login.err = false;
        const payload = $auth.getPayload();
        $window.localStorage.setItem('userId', payload._id);

        const tripData = TripService.getTrip();
        // console.log(data);
        if (tripData) {
          tripData.user = data.data.user._id;

          Trip.save(tripData, (res) => {
            console.log('saved trip! ', res);
            return $state.go('budgetTracker', { id: res._id });
          });
        }

        $state.go('home');
      }, (error) => {
        console.log(error);
        login.err = true;
      });
  }

  function authenticate(service) {
    $auth
      .authenticate(service)
      .then((data) => {
        const tripData = TripService.getTrip();
        // console.log(data);
        if (tripData) {
          tripData.user = data.data.user._id;

          Trip.save(tripData, (res) => {
            console.log('saved trip! ', res);
            return $state.go('budgetTracker', { id: res._id });
          });
        }

        $state.go('home');
      });
  }

  login.authenticate = authenticate;

  login.submit = submit;
}
