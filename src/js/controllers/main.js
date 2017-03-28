angular
  .module('YTHO')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', '$state', '$auth', '$http', 'Accumulator'];
function MainCtrl($rootScope, $state, $auth, $http, Accumulator) {
  const vm = this;
  //vm.stateHasChanged = false;
  vm.user = [];

  vm.isAuthenticated = $auth.isAuthenticated;

  $rootScope.$on('error', (e, err) => {
    vm.stateHasChanged = false;
    vm.message = err.data.message;
    $state.go('login');
  });
  //
  $rootScope.$on('$stateChangeSuccess', () => {
    if(vm.stateHasChanged) vm.message = null;
    if(!vm.stateHasChanged) vm.stateHasChanged = true;
    if($auth.getPayload()) {
      vm.currentUserId = $auth.getPayload().userId;
    }
  });

  function logout() {
    $auth.logout();
    $state.go('login');
  }
  vm.logout = logout;

  // function getUserProfile() {
  //   $http
  //   .get('/api/profile')
  //   .then((response) => vm.user = response.data);
  // }
  //
  // vm.dislayTrackedEvents = dislayTrackedEvents;

  // function dislayTrackedEvents(accumulatorId) {
  //   $http
  //     .get(`/api/accumulators/${accumulatorId}`)
  //     .then((response) => vm.events = response.data);
  // }
  //
  // vm.newAccumulator = {};
  //
  // function createAccumulator() {
  //   Accumulator
  //     .save(vm.newAccumulator)
  //     .$promise
  //     .then((accy) => vm.user.accumulators.push(accy));
  // }
  //
  //
  // vm.createAccumulator = createAccumulator;


}
