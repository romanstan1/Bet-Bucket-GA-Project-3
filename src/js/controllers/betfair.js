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
      .get('/api/listEvents', { params: { eventTypeId: vm.eventTypeId, startDate: vm.startDate, endDate: vm.endDate }})
      .then((response) => vm.all = response.data);
  }

  vm.listMarkets = listMarkets;
  function listMarkets(eventId) {
    $http
      .get('/api/listMarkets', { params: { eventId }})
      .then((response) => {
        console.log(response);
        vm.markets = response.data;
      });
  }
}
