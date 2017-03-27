angular
  .module('YTHO')
  .controller('PartialsCtrl', PartialsCtrl);

PartialsCtrl.$inject = ['$http'];
function PartialsCtrl($http) {
  const vm = this;

  vm.all = [];
  vm.listEvents = listEvents;

  function listEvents() {
    $http
      .get('/api/data')
      .then((response) => vm.all = response.data);
  }
}
