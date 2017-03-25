angular
  .module('YTHO')
  .controller('ProfileCtrl', ProfileCtrl)
  .controller('ShowCtrl', ShowCtrl);


ProfileCtrl.$inject = ['$http', '$auth', '$state'];
function ProfileCtrl($http, $auth, $state) {
  const vm = this;

  vm.user = [];
  vm.events = [];

  getUserProfile();

  function getUserProfile() {
    $http
    .get('/api/profile')
    .then((response) => vm.all = response.data);
  }

  vm.getEvent = getEvent;

  function getEvent(accumulatorId) {
    $http
      .get(`/api/accumulators/${accumulatorId}`)
      .then((response) => vm.events = response.data);
  }

  function logout() {
    $auth.logout();
    $state.go('login');
  }

  vm.logout = logout;
}

ShowCtrl.$inject = ['$http'];
function ShowCtrl($http) {
  const vm = this;

  vm.all = [];

  $http
    .get('/api/data')
    .then((response) => vm.all = response.data);

}
