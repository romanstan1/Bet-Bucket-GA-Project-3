/* global moment */
angular
  .module('YTHO')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', '$state', '$auth'];
function MainCtrl($rootScope, $state, $auth) {
  const vm = this;
  //vm.stateHasChanged = false;

  vm.isAuthenticated = $auth.isAuthenticated;
  vm.logout = logout;

  function logout() {
    $auth.logout();
    $state.go('login');
  }

  $rootScope.$on('loggedIn', (e, message) => {
    vm.stateHasChanged = false;
    vm.message = message;
  });

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

}
//this section is for the chart and sets parameters for how often it refreshes and what it displays
