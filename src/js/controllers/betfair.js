angular
  .module('YTHO')
  .controller('BetfairSelectCtrl', BetfairSelectCtrl);

BetfairSelectCtrl.$inject = ['$http'];
function BetfairSelectCtrl($http) {
  const vm = this;

  vm.all = [];
  vm.listEvents = listEvents;

  function listEvents() {
    $http
      .get('/api/data')
      .then((response) => vm.all = response.data);
  }
}
