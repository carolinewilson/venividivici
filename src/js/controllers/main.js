angular.module('travelApp')
  .controller('MainController', MainController);

MainController.$inject = ['$auth', '$state'];
//MainController.$inject = ['$auth', '$state', '$rootScope'];
//function MainController($auth, $state, $rootScope) {

function MainController($auth, $state) {
  const main = this;

  main.isLoggedIn = $auth.isAuthenticated;

  function logout() {
    $auth.logout()
      .then(() => {
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
