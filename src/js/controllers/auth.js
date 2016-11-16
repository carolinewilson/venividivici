angular.module('travelApp')
  .controller('RegisterController', RegisterController)
  .controller('LoginController', LoginController);
  // .controller('HomeController', HomeController);

RegisterController.$inject = ['$auth', '$state'];
function RegisterController($auth, $state) {
  const register = this;

  register.user = {};

  function submit() {
    $auth.signup(register.user)
      .then(() => {
        $state.go('home');
      });
  }

  register.submit = submit;
}

LoginController.$inject = ['$auth', '$state'];
function LoginController($auth, $state) {
  const login = this;

  login.credentials = {};

  function submit() {
    console.log('login');
    $auth.login(login.credentials)
      .then(() => {
        $state.go('home');
      });
  }

  login.submit = submit;
}
