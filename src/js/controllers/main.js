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

  main.images = [{
    url: 'https://paraphrasinglife.files.wordpress.com/2014/08/no-1-alternative.jpg',
    caption: 'One s destination is never a place, but a new way of seeing things..'
  }, {
    url: 'http://sevennaturalwonders.org/wp-content/uploads/2015/04/rothera111.jpg',
    caption: 'Don t tell how educated you are, tell me how much you travelled'
  }, {
    url: 'http://maupintour.com/wp-content/uploads/2015/10/Historic-Coliseum-Rome-Italy.jpg',
    caption: 'Coliseum'
  }];
}
