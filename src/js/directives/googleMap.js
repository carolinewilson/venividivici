angular.module('travelApp')
  .directive('googleMap', googleMap);

googleMap.$inject = ['$window'];
function googleMap($window) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map">Google Map here</div>',
    scope: {
      center: '='
    },
    link: function($scope, element) {
      $scope.$watch('center', (newVal) => {
        if(newVal && newVal.lat && newVal.lng) {
          new $window.google.maps.Map(element[0], {
            center: $scope.center,
            zoom: 8
          });
        }
      });

    }
  };
}
