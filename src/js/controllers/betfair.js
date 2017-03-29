angular
  .module('YTHO')
  .controller('BetfairSelectCtrl', BetfairSelectCtrl)
  .controller('BetfairMarketCtrl', BetfairMarketCtrl);

BetfairSelectCtrl.$inject = ['$http', '$stateParams'];
function BetfairSelectCtrl($http, $stateParams) {
  const vm = this;
  const list = {
    Soccer: 1,
    Tennis: 2,
    Golf: 3,
    Cricket: 4,
    Rugby: 5,
    Boxing: 6,
    Horse: 7,
    Motor: 8,
    Special: 10
  };
  vm.all = [];

  listEvents();
  function listEvents() {
    $http
      .get('/api/listEvents', { params: { eventTypeId: list[$stateParams.eventType] }})
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
