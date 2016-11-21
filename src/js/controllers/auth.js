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
          });
          return $state.go('usersShow', { id: res.data.user._id });
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
        console.log(data);
        if (tripData) {

          tripData.user = data.data.user._id;

          Trip.save(tripData, (res) => {
            console.log('saved trip! ', res);
            $state.go('budgetTracker', { id: res._id });
          });
        }

        $state.go('home');
      });
  }

  function authenticate(service) {
    $auth.authenticate(service, () => {
      $state.go('home');
    });
  }

  login.authenticate = authenticate;

  login.submit = submit;
}
