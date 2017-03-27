angular
  .module('YTHO')
  .factory('Accumulator', Accumulator);


Accumulator.$inject = ['$resource'];
function Accumulator($resource) {
  return new $resource('/api/accumulators/:id', { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
