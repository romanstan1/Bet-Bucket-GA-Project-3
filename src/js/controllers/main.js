angular
  .module('YTHO')
  .controller('ProfileCtrl', ProfileCtrl)
  .controller('ShowCtrl', ShowCtrl);


ProfileCtrl.$inject = ['$http'];
function ProfileCtrl($http) {
  const vm = this;

  vm.all = [];

  $http
    .get('/api/profile')
    .then((response) => vm.all = response.data);
}

ShowCtrl.$inject = ['$http'];
function ShowCtrl($http) {
  const vm = this;

  vm.all = [];

  $http
    .get('/api/data')
    .then((response) => vm.all = response.data);

}
