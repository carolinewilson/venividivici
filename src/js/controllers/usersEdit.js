angular.module('travelApp')
  .controller('UsersEditController', UsersEditController);

UsersEditController.$inject = ['User', '$state'];

function UsersEditController(user, $state) {
  const usersEdit = this;
  usersEdit.user = user.get($state.params);

  function update() {
    user.update({ id: usersEdit.user._id }, usersEdit.user, () => {
      $state.go('home', $state.params);


    });
  }

  this.update = update;
}
