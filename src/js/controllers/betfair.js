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
    console.log($stateParams);
    $http
      .get('/api/listMarkets', { params: $stateParams })
      .then((response) => {
        vm.markets = response.data;
        getMarketOdds(vm.markets[0].marketId);
      });
  }

  function selectRunner(selectedMarket) {
    vm.markets.forEach((market) => {
      market.selected = false;
    });
    selectedMarket.selected = true;
  }

  vm.selectRunner = selectRunner;


  vm.getMarketOdds = getMarketOdds;

  function getMarketOdds(marketId) {
    $http
      .get('/api/marketOdds', { params: { marketId }})
      .then((response) => {
        vm.specificMarket = response.data[0];
      });
  }

}
