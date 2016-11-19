angular.module('travelApp')
  .controller('MainController', MainController);

MainController.$inject = ['$auth', '$state', '$window', 'TripService', 'UserService'];
//MainController.$inject = ['$auth', '$state', '$rootScope'];
//function MainController($auth, $state, $rootScope) {

function MainController($auth, $state, $window, TripService, UserService) {
  const main = this;

  main.isLoggedIn = $auth.isAuthenticated;
  main.userId = $window.localStorage.getItem('userId');
  // UserService.getUser();
  // console.log(UserService.getUser());

  function logout() {
    $auth.logout()
      .then(() => {
        $window.localStorage.removeItem('userId');
        // $auth.getPayload()._id
        TripService.deleteTrip();
        $state.go('login');
      });
  }

  // main.message = null;
  // const protectedStates = ['filmsEdit', 'filmsNew'];
  //
  // function secureState(e, toState) {
  //   main.message = null;
  //   if(!$auth.isAuthenticated() && protectedStates.includes(toState.name)) {
  //     e.preventDefault();
  //     $state.go('login');
  //     main.message = 'You must be logged in to go there!';
  //   }
  // }
  //
  // $rootScope.$on('$stateChangeStart', secureState);

  main.logout = logout;
}
