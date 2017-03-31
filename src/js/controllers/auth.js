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

//
//   vm.labels = ['', '', '', '', '', '', '', '', ''];
//   vm.series = ['sA','sb', 'sb' ];
//   vm.data = [
//     [75, 70, 70, 71, 78, 84, 85, 88, 92],
//     [50, 48, 49, 52, 55, 68, 46, 44, 51],
//     [20, 22, 19, 13, 26, 19, 25, 37, 33]
//   ];
//
//   vm.borderWidth = 0;
//
//   setInterval(() => {
//
//     vm.data[0][1] = Math.floor(Math.random()*15)+55;
//     vm.data[0][3] = Math.floor(Math.random()*15)+70;
//     vm.data[0][6] = Math.floor(Math.random()*5)+77;
//     vm.data[0][7] = Math.floor(Math.random()*5)+90;
//     vm.data[0][8] = Math.floor(Math.random()*30)+85;
//     vm.data[1][1] = Math.floor(Math.random()*25)+50;
//     vm.data[1][2] = Math.floor(Math.random()*5)+60;
//     vm.data[1][3] = Math.floor(Math.random()*30)+50;
//     vm.data[1][4] = Math.floor(Math.random()*20)+55;
//     vm.data[1][5] = Math.floor(Math.random()*20)+55;
//     vm.data[1][8] = Math.floor(Math.random()*15)+55;
//     vm.data[2][1] = Math.floor(Math.random()*20)+10;
//     vm.data[2][2] = Math.floor(Math.random()*20)+10;
//     vm.data[2][3] = Math.floor(Math.random()*5)+15;
//     vm.data[2][4] = Math.floor(Math.random()*5)+30;
//     vm.data[2][5] = Math.floor(Math.random()*5)+25;
//     vm.data[2][6] = Math.floor(Math.random()*5)+25;
//     vm.data[2][8] = Math.floor(Math.random()*15)+10;
//     vm.data[2][9] = Math.floor(Math.random()*15)+10;
//
//     // vm.data[2][5] = Math.floor(Math.random()*40)+30;
//     // vm.data[2][4] = Math.floor(Math.random()*40)+30;
//     // vm.data[2][2] = Math.floor(Math.random()*40)+30;
//     // vm.data[2][9] = Math.floor(Math.random()*40)+30;
//     $scope.$apply();
//     // });
//
//   }, 4000); // stop timer after 10 seconds
//
//
//   vm.colors = ['#062735', '#062735', '#063846'];
//
//   vm.options = {
//     animation: {
//       duration: 6000
//     },
//     elements: {
//       line: {
//         fill: true,
//         border: false,
//         borderWidth: 0.1
//       },
//       point: {
//         //fill: ['#062735'],
//         background: '#062735',
//         radius: 0,
//         borderWidth: 0
//       }
//     },
//     tooltips: false,
//     scales: {
//       yAxes: [
//         {
//           id: 'y-axis-1',
//           type: 'linear',
//           ticks: { min: 0, max: 100 },
//           display: false,
//           position: 'left'
//         },
//         {
//           id: 'y-axis-2',
//           type: 'linear',
//           display: false,
//           position: 'right'
//         }
//       ],
//       xAxes: [ {
//         display: false
//       }
//       ]
//     }
//
//   };
//
}
