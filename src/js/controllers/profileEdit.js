angular.module('travelApp')
  .controller('ProfileEditController', ProfileEditController);

ProfileEditController.$inject = ['User', '$state'];

function ProfileEditController(User, $state) {
  const profileEdit = this;
  profileEdit.profile = User.get($state.params);

  function update() {
    if (profileEdit.profile.preferredAirport) {
      const airport = profileEdit.profile.preferredAirport.split(',');
      profileEdit.profile.preferredAirport = airport[0];
      profileEdit.profile.preferredAirportCode = airport[1];
    }

    User.update({ id: profileEdit.profile._id }, profileEdit.profile, () => {
      $state.go('profileShow', $state.params);

    });
  }

  this.update = update;
}
