angular.module('travelApp')
  .directive('carousel', carousel);

carousel.$inject = ['$interval', '$window'];
function carousel($interval, $window) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'templates/carousel.html',
    scope: {
      images: '=',
      delay: '='
    },
    link: ($scope, element) => {

      $scope.currentIndex = 0;

      let images = [];
      let navButtons = [];
      let timer = null;
      let isMoving = false;

      element.ready(() => {
        images = angular.element(element[0].querySelectorAll('li.image'));
        navButtons = angular.element(element[0].querySelectorAll('nav li'));
        images.css({ left: '100%', zIndex: 0 });
        images.eq(0).css({ left: 0, zIndex: 1 });

        navButtons.eq(0).addClass('active');
        startTimer();
      });

      element
        .on('mouseenter', stopTimer)
        .on('mouseleave', startTimer);

      angular.element($window)
        .on('blur', stopTimer)
        .on('focus', startTimer);

      function move(index) {

        if(!images.length) return;

        isMoving = true;
        stopTimer();

        const image = images.eq(index);
        const navButton = navButtons.eq(index);

        // not overly happy with using a timeout here... not sure what else to do
        image.addClass('active').css({ left: 0, zIndex: 1 });
        image.on('transitionend WebkitTransitionEnd', () => {
          images.css({ left: '100%' });
          image.removeClass('active').css({ left: 0, zIndex: 0 });
          navButtons.removeClass('active');
          navButton.addClass('active');
          isMoving = false;
          startTimer();
        });
      }

      function startTimer() {
        if(timer) return false;
        timer = $interval(next, $scope.delay);
      }

      function stopTimer() {
        if(!timer) return false;
        $interval.cancel(timer);
        timer = null;
      }

      function go(index) {
        if(isMoving) return;
        $scope.currentIndex = index;
      }

      function next() {
        if(isMoving) return;
        $scope.currentIndex = $scope.currentIndex === images.length-1 ? 0 : $scope.currentIndex+1;
      }

      function prev() {
        if(isMoving) return;
        $scope.currentIndex = $scope.currentIndex === 0 ? images.length-1 : $scope.currentIndex-1;
      }

      $scope.go = go;
      $scope.next = next;
      $scope.prev = prev;

      $scope.$watch('currentIndex', move);
      $scope.$on('$destroy', stopTimer);

    }
  };
}
