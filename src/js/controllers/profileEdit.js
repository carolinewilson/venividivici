angular.module('travelApp')
  .controller('ProfileEditController', ProfileEditController);

ProfileEditController.$inject = ['User', '$state'];

function ProfileEditController(User, $state) {
  const profileEdit = this;
  profileEdit.profile = User.get($state.params);

  function update() {
    User.update({ id: profileEdit.profile._id }, profileEdit.profile, () => {
      $state.go('home', $state.params);

    });
  }

  this.update = update;
}
