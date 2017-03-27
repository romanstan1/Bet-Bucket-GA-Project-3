angular
  .module('YTHO')
  .controller('BetfairSelectCtrl', BetfairSelectCtrl)
  .controller('BetfairMarketCtrl', BetfairMarketCtrl);

BetfairSelectCtrl.$inject = ['$http'];
function BetfairSelectCtrl($http) {
  const vm = this;

  vm.all = [];
  vm.listEvents = listEvents;
  vm.eventTypeId = 1;
  vm.startDate = new Date();
  vm.endDate = vm.startDate;

  function listEvents() {
    $http
      .get('/api/listEvents', { params: { eventTypeId: vm.eventTypeId, startDate: vm.startDate, endDate: vm.endDate }})
      .then((response) => vm.all = response.data);
  }
}

BetfairMarketCtrl.$inject = ['$http', '$state', '$stateParams', 'filterFilter'];
function BetfairMarketCtrl($http, $state, $stateParams, filterFilter) {
  const vm = this;

  listMarkets();
  vm.listMarkets = listMarkets;
  function listMarkets() {
    $http
      .get('/api/listMarkets', { params: $stateParams })
      .then((response) => {
        vm.markets = response.data;
        vm.filteredMarkets = filterFilter(vm.markets, { runners: { selectionId: 354169 }} );
        // vm.markets = vm.filteredMarkets;
      });
  }


  vm.getMarketOdds = getMarketOdds;

  function getMarketOdds(marketId) {
    $http
      .get('/api/marketOdds', { params: { marketId }})
      .then((response) => {
        vm.specificMarket = response.data[0];
      });
  }

}
