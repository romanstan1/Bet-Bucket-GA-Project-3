angular
  .module('YTHO')
  .factory('Accumulator', Accumulator)
  .factory('Event', Event);


Accumulator.$inject = ['$resource'];
function Accumulator($resource) {
  return new $resource('/api/accumulators/:id', { id: '@id' }, {
    update: { method: 'PUT' }
  });
}

Event.$inject = ['$resource'];
function Event($resource) {
  return new $resource('/api/accumulators/:accumulatorId/events/:id', { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
