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

  function listEvents() {
    $http
      .get('/api/listEvents', { params: { eventTypeId: vm.eventTypeId, startDate: vm.startDate, endDate: vm.endDate }})
      .then((response) => vm.all = response.data);
  }
}

BetfairMarketCtrl.$inject = ['$http', '$state', '$stateParams'];
function BetfairMarketCtrl($http, $state, $stateParams) {
  const vm = this;

  listMarkets();
  vm.listMarkets = listMarkets;
  function listMarkets() {
    console.log($stateParams);
    $http
      .get('/api/listMarkets', { params: $stateParams })
      .then((response) => {
        vm.markets = response.data;
      });
  }

  vm.runnerNames = [];

  function selectMarket(selectedMarket) {
    vm.markets.forEach((market) => {
      market.selected = false;
    });
    selectedMarket.selected = true;
    selectedMarket.runners.forEach((element) => {
      return vm.runnerNames.push(element.runnerName);
    });
  }

  vm.selectMarket = selectMarket;
  vm.getMarketOdds = getMarketOdds;

  function getMarketOdds(marketId) {
    $http
      .get('/api/marketOdds', { params: { marketId }})
      .then((response) => {
        vm.specificMarket = response.data[0];
      });
  }

}
