angular.module('travelApp')
  .service('FlightService', FlightService);

FlightService.$inject = ['$http'];
function FlightService($http) {

  function getPrice(origin, destination, departDate, returnDate) {

    return $http({
      method: 'GET',
      url: '/flights',
      params: {
        origin,
        destination,
        departDate,
        returnDate
      }
    }).then(function successCallback(response) {
      return response.data;
    }, function errorCallback(response) {
      console.log(response);
    });
  }

  this.getPrice = getPrice;
}
