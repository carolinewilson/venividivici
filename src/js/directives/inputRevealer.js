angular.module('travelApp')
  .directive('inputRevealer', inputRevealer);

inputRevealer.$inject = ['$timeout'];
function inputRevealer($timeout) {
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
          $timeout(() => {
            element[0].querySelector('input').select();
          },0);
        }
        $scope.$apply();
      }).on('keydown', (e) => {
        if(e.keyCode === 9 || e.keyCode === 13) {
          e.preventDefault();
          $scope.onSubmit();
          $scope.isEditing = false;
          $scope.$apply();
        }
      });
    }
  };
}
