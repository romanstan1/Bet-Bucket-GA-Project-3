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

  getUserProfile();

  function getUserProfile() {
    $http
    .get('/api/profile')
    .then((response) => vm.user = response.data);
  }

  vm.dislayTrackedEvents = dislayTrackedEvents;

  function dislayTrackedEvents(accumulatorId) {
    $http
      .get(`/api/accumulators/${accumulatorId}`)
      .then((response) => vm.events = response.data);
  }

  vm.newAccumulator = {};

  function createAccumulator() {
    Accumulator
      .save(vm.newAccumulator)
      .$promise
      .then((accy) => vm.user.accumulators.push(accy));
  }


  vm.createAccumulator = createAccumulator;
}
