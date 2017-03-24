angular
  .module('YTHO')
  .controller('ProfileCtrl', ProfileCtrl);


ProfileCtrl.$inject = ['$http'];
function ProfileCtrl($http) {
  const vm = this;

  vm.all = [];

  $http
    .get('/api/profile')
    .then((response) => vm.all = response.data);
}
