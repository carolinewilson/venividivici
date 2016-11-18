angular.module('travelApp')
  .service('UserService', UserService);

UserService.$inject = ['$window'];
function UserService($window) {

  function saveUser(userData) {
    $window.localStorage.setItem('userId', userData);
  }

  function getUser() {
    return $window.localStorage.getItem('userId');
  }

  this.saveUser = saveUser;
  this.getUser = getUser;
}
