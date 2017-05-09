angular
  .module('YTHO')
  .controller('RegisterCtrl', RegisterCtrl)
  .controller('LoginCtrl', LoginCtrl);

RegisterCtrl.$inject = ['$auth', '$state'];
function RegisterCtrl($auth, $state) {
  const vm = this;
  vm.user = {};

  function submit() {
    if (vm.registerForm.$valid) {
      $auth.signup(vm.user)
        .then(() => $state.go('login'));
    }
  }

  vm.submit = submit;
}

LoginCtrl.$inject = ['$auth', '$state', '$scope', '$rootScope'];
function LoginCtrl($auth, $state, $scope, $rootScope) {
  const vm = this;
  vm.credentials = {};

  function submit() {
    if (vm.loginForm.$valid) {
      $auth.login(vm.credentials)
        .then((res) => {
          $rootScope.$broadcast('loggedIn', res.data.message);
          $state.go('profile');
        });
    }
  }
  vm.submit = submit;
}
