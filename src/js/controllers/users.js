angular
  .module('YTHO')
  .controller('UsersShowCtrl', UsersShowCtrl);

UsersShowCtrl.$inject = ['$rootScope', '$state', '$auth', '$http', 'Accumulator', 'Event'];
function UsersShowCtrl($rootScope, $state, $auth, $http, Accumulator, Event) {
  const vm = this;
  vm.greeting = 'hello';
  vm.chosenMarket = null;
  vm.eventButton = true;

  function selectMarket(selectedMarket) {
    vm.chosenMarket = selectedMarket;
  }

  vm.selectMarket = selectMarket;

  function addToAccumulator(runner, index) {
    vm.newEvent.runnerId = runner.selectionId;
    vm.newEvent.runnerName = vm.chosenMarket.runners[index].runnerName;
    console.log(vm.newEvent);

    Event
      .save({ accumulatorId: vm.currentAccumulator.id }, vm.newEvent)
      .$promise
      .then((event) => {
        vm.currentAccumulator.events.push(event);
        vm.newEvent = {};
      });
  }

  vm.addToAccumulator = addToAccumulator;

  function accumulatorsDelete(accumulator) {
    Accumulator
      .delete({ id: accumulator.id })
      .$promise
      .then(() => {
        const index = vm.user.accumulators.indexOf(accumulator);
        vm.user.accumulators.splice(index, 1);
        vm.currentAccumulator = null;
      });
  }

  vm.delete = accumulatorsDelete;

  getUserProfile();

  function getUserProfile() {
    $http
    .get('/api/profile')
    .then((response) => vm.user = response.data);
  }

  vm.displayTrackedEvents = displayTrackedEvents;

  function displayTrackedEvents(accumulatorId) {
    $http
      .get(`/api/accumulators/${accumulatorId}`)
      .then((response) => vm.events = response.data);
  }

  vm.createAccumulator = createAccumulator;
  vm.newAccumulator = {};

  function createAccumulator() {
    if(vm.accyForm.$valid) {
      Accumulator
        .save(vm.newAccumulator)
        .$promise
        .then((accy) => vm.user.accumulators.push(accy));
    }
  }
  vm.chooseAccumulator = chooseAccumulator;

  function chooseAccumulator(accy) {
    vm.currentAccumulator = accy;
  }

  vm.deleteEvent = deleteEvent;

  function deleteEvent(event) {
    Event
      .delete({ accumulatorId: vm.currentAccumulator.id,  id: event.id })
      .$promise
      .then(() => {
        const index = vm.currentAccumulator.events.indexOf(event);
        vm.currentAccumulator.events.splice(index, 1);
      });
  }
}
