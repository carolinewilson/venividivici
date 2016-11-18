angular.module('travelApp')
  .factory('User', User);

User.$inject = ['$resource'];
function User($resource) {
  return new $resource('/users/:id', { id: '@_id' }, {
    update: {method: 'PUT'}
  });
}
