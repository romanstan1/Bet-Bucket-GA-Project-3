angular
  .module('YTHO')
  .controller('ShowCtrl', ShowCtrl);


ShowCtrl.$inject = ['$http'];
function ShowCtrl($http) {
  const vm = this;

  vm.all = [];

  $http
    .get('/api/show')
    .then((response) => vm.all = response.data);
}
