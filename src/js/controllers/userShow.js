angular.module('travelApp')
  .controller('UsersShowController', UsersShowController);

UsersShowController.$inject = ['User', '$state'];

function UsersShowController(User, $state) {
  const usersShow = this;

  usersShow.user = User.get($state.params);
  console.log(usersShow.user);

}
