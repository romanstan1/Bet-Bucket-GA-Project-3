angular
  .module('YTHO')
  .controller('UsersShowCtrl', UsersShowCtrl);

UsersShowCtrl.$inject = ['$rootScope', '$state', '$auth', '$http', 'Accumulator'];
function UsersShowCtrl($rootScope, $state, $auth, $http, Accumulator) {
  const vm = this;
  vm.greeting = 'hello';

  function addEvent(runner) {
    console.log(runner);
  }

  vm.addEvent = addEvent;

// delete function

  function accumulatorsDelete(accumulator) {
    Accumulator
      .delete({ id: accumulator.id })
      .$promise
      .then(() => {
        const index = vm.user.accumulators.indexOf(accumulator);
        vm.user.accumulators.splice(index, 1);
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
    Accumulator
      .save(vm.newAccumulator)
      .$promise
      .then((accy) => vm.user.accumulators.push(accy));
  }

  vm.chooseAccumulator = chooseAccumulator;

  function chooseAccumulator(id, name) {
    vm.currentAccumulator = { id, name };
  }

}
