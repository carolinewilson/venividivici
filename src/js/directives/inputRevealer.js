angular.module('travelApp')
  .directive('inputRevealer', inputRevealer);

function inputRevealer() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'templates/inputRevealer.html',
    scope: {
      type: '@',
      name: '@',
      ngModel: '=',
      onSubmit: '&'
    },
    link: function($scope, element) {
      element.on('click', () => {
        if(!$scope.isEditing) {
          $scope.isEditing = true;
        }
        $scope.$apply();
      }).on('keyup', (e) => {
        if(e.keyCode === 13) {
          $scope.onSubmit();
          $scope.isEditing = false;
          $scope.$apply();
        }
      });
    }
  };
}
