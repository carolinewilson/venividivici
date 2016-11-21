angular.module('travelApp')
  .service('MapService', MapService);

MapService.$inject = ['$http'];
function MapService($http) {

  function getMap(destination) {
    return $http({
      method: 'GET',
      url: '/maps',
      params: {
        destination
      }
    }).then(function successCallback(response) {
      return response.data;
    }, function errorCallback(response) {
      console.log(response);
    });
  }

  this.getMap = getMap;
}
