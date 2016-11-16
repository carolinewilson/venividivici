angular.module('travelApp')
  .factory('Location', Location);

Location.$inject = ['$resource'];
function Location($resource) {
  return new $resource('/locations/:id', { id: '@_id' }, {
    update: {method: 'PUT'}
  });
}
