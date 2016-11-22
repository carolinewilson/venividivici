angular.module('travelApp')
  .directive('googleMap', googleMap);

googleMap.$inject = ['$window'];
function googleMap($window) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map"></div>',
    scope: {
      center: '='
    },
    link: function($scope, element) {
      $scope.$watch('center', (newVal) => {
        if(newVal && newVal.lat && newVal.lng) {
          const map = new $window.google.maps.Map(element[0], {
            center: $scope.center,
            zoom: 12,
            disableDefaultUI: true,
            zoomControl: true,
            scaleControl: true,
            scrollwheel: false
          });

          new $window.google.maps.Marker({
            position: $scope.center,
            map
          });
        }
      });

    }
  };
}
