angular.module('travelApp')
  .factory('Trip', Trip);

Trip.$inject = ['$resource'];
function Trip($resource) {
  return new $resource('/trips/:id', { id: '@_id' }, {
    update: {method: 'PUT'}
  });
}
