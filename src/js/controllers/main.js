angular
  .module('YTHO')
  .controller('MainCtrl', MainCtrl)
  .controller('LineCtrl', LineCtrl);

MainCtrl.$inject = ['$rootScope', '$state', '$auth', '$http', 'Accumulator'];
function MainCtrl($rootScope, $state, $auth, $http, Accumulator) {
  const vm = this;
  //vm.stateHasChanged = false;

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
  // vm.displayTrackedEvents = displayTrackedEvents;

  // function displayTrackedEvents(accumulatorId) {
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
//this section is for the chart and sets parameters for how often it refreshes and what it displays

LineCtrl.$inject = ['$scope'];
function LineCtrl($scope) {
  // console.log('LineCtrl loading');
  const vm = this;
  let test = 1;

  const now = moment().format('hh:mm:ss');
  // console.log(now);


  vm.labels = [now];
  vm.series = ['Series A'];
  vm.data = [
    [test]
  ];
  vm.options = {
    animation: false
  };

  const timerId = setInterval(() => {
    updateGraph();
  }, 1000); // every 10 seconds get new data and push into vm.data and vm.labels

  setTimeout(() => {
    clearInterval(timerId);
  }, 2000); // stop timer after 10 seconds

  function updateGraph() {
    test++;
    const time = moment().format('hh:mm:ss');
    vm.data[0].push(test);
    vm.labels.push(time);
    $scope.$apply();
  }


}
