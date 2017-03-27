angular
  .module('YTHO')
  .directive('betfairSelect', betfairSelect);

function betfairSelect() {
  const directive = {
    restrict: 'E',
    replace: true,
    templateUrl: 'js/views/partials/betfairSelect.html',
    controller: 'BetfairSelectCtrl as betfairSelect'
  };

  return directive;
}
