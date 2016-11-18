angular.module('travelApp')
  .controller('RegisterController', RegisterController)
  .controller('LoginController', LoginController);

RegisterController.$inject = ['$auth', '$state', '$window', 'User'];
function RegisterController($auth, $state, $window, User) {
  const register = this;

  register.user = {};

  function submit() {
    $auth.signup(register.user)
      .then((res) => {
        $window.localStorage.setItem('token', res.data.token);
        // const newUser = User.get({ id: $auth.getPayload()._id });
        // console.log('user', newUser._id, newUser.username);
        const payload = $auth.getPayload();
        $window.localStorage.setItem('userId', payload._id);
        console.log(User);
        $state.go('home');
      });
  }

  register.submit = submit;
}

LoginController.$inject = ['$auth', '$state', '$window'];
function LoginController($auth, $state, $window) {
  const login = this;

  login.credentials = {};

  function submit() {
    $auth.login(login.credentials)
      .then(() => {
        const payload = $auth.getPayload();
        $window.localStorage.setItem('userId', payload._id);
        $state.go('home');
      });
  }

  login.submit = submit;
}
