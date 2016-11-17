angular.module('travelApp')
  .service('TripService', TripService);

TripService.$inject = ['$window'];
function TripService($window) {

  function saveTrip(tripData) {
    $window.localStorage.setItem('tripData', JSON.stringify(tripData));
  }

  function getTrip() {
    return JSON.parse($window.localStorage.getItem('tripData'));
  }

  function deleteTrip() {
    return $window.localStorage.removeItem('tripData');
  }

  this.saveTrip = saveTrip;
  this.getTrip = getTrip;
  this.deleteTrip = deleteTrip;
}
