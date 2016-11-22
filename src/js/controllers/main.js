angular.module('travelApp')
  .controller('MainController', MainController);

MainController.$inject = ['$auth', '$state', '$window', 'TripService', '$rootScope'];
function MainController($auth, $state, $window, TripService, $rootScope) {
  const main = this;

  main.isLoggedIn = $auth.isAuthenticated;
  main.userId = $window.localStorage.getItem('userId');


  const protectedStates = ['locationsNew', 'locationsEdit', 'budgetTracker', 'profileShow', 'profileEdit'];
  function secureState(e, toState) {
    if(!$auth.isAuthenticated() && protectedStates.includes(toState.name)) {
      e.preventDefault();
      $state.go('login');
    }
  }

  $rootScope.$on('$stateChangeStart', secureState);

  main.images = [{
    url: 'https://paraphrasinglife.files.wordpress.com/2014/08/no-1-alternative.jpg',
    caption: 'One\'s destination is never a place, but a new way of seeing things..'
  }, {
    url: 'http://sevennaturalwonders.org/wp-content/uploads/2015/04/rothera111.jpg',
    caption: 'Don\'t tell how educated you are, tell me how much you travelled'
  }, {
    url: 'http://maupintour.com/wp-content/uploads/2015/10/Historic-Coliseum-Rome-Italy.jpg',
    caption: 'Coliseum'
  }];
}
