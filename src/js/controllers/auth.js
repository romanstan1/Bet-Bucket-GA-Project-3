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

LoginCtrl.$inject = ['$auth', '$state', '$scope'];
function LoginCtrl($auth, $state, $scope) {
  const vm = this;
  vm.credentials = {};

  function submit() {
    if (vm.loginForm.$valid) {
      $auth.login(vm.credentials)
        .then(() => $state.go('profile'));
    }
  }

  vm.submit = submit;




  // let test = 1;

  //const now = moment().format('hh:mm:ss');
  // console.log(now);


  vm.labels = ['', '', '', '', '', '', '', '', ''];
  vm.series = ['sA','sb', 'sb' ];
  vm.data = [
    [65, 59, 80, 81, 66, 75, 70, 77, 87],
    [38, 48, 40, 49, 36, 57, 36, 50, 43],
    [28, 33, 10, 13, 36, 37, 13, 17, 9]
  ];

  vm.borderWidth = 0;

  setInterval(() => {
    //const first = vm.data[0];
    // first.forEach(function (x) {
    //   x = Math.floor(Math.random()*90);
    //   first.pop();
    //   first.unshift(x);
    //   $scope.$apply();
    // });
    //
    // const second = vm.data[1];
    // second.forEach(function (x) {
    //   x = Math.floor(Math.random()*90);
    //   second.pop();
    //   second.unshift(x);
    //   $scope.$apply();
    // });
    vm.data[1][6] = Math.floor(Math.random()*30);
    vm.data[1][4] = Math.floor(Math.random()*30);
    vm.data[1][2] = Math.floor(Math.random()*30);
    vm.data[1][1] = Math.floor(Math.random()*30);
    vm.data[1][8] = Math.floor(Math.random()*30);
    vm.data[0][6] = Math.floor(Math.random()*30)+40;
    vm.data[0][9] = Math.floor(Math.random()*30)+50;
    vm.data[0][8] = Math.floor(Math.random()*30)+50;
    vm.data[0][2] = Math.floor(Math.random()*30)+60;
    vm.data[0][4] = Math.floor(Math.random()*30)+50;
    vm.data[0][1] = Math.floor(Math.random()*30)+50;
    vm.data[2][5] = Math.floor(Math.random()*40)+30;
    vm.data[2][4] = Math.floor(Math.random()*40)+30;
    vm.data[2][2] = Math.floor(Math.random()*40)+30;
    vm.data[2][9] = Math.floor(Math.random()*40)+30;
    $scope.$apply();
    // });

  }, 100); // stop timer after 10 seconds


  // vm.options = {
  //   animation: true
  // };
//   var ctx = "myChart";
//   var myChart = new Chart(ctx, {
//     type: 'line',
//     data: {
//         labels: ['Item 1', 'Item 2', 'Item 3'],
//         datasets: [
//             {
//                 type: 'line',
//                 label: 'Bar Component',
//                 data: [10, 20, 30, 22 ,12, 3,],
//             },
//             {
//                 type: 'line',
//                 label: 'Line Component',
//                 data: [30, 20, 10, 23, 31],
//             }
//         ]
//     }
// });
  vm.colors = ['#332f56', '#514d7a', '#2f2a60'];

  vm.options = {
    elements: {
      line: {
        fill: true,
        border: false,
        borderWidth: 0.1
      },
      point: {
        radius: 0,
        borderWidth: 0
      }
    },
    tooltips: false,
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: false,
          position: 'left'
        },
        {
          id: 'y-axis-2',
          type: 'linear',
          display: false,
          position: 'right'
        }
      ],
      xAxes: [ {
        display: false
      }
      ]
    }

  };

  // vm.override = [
  //     {
  //       borderColor: '#FAEBD7',
  //       pointBorderColor: '#fff'
  //     },
  //     {
  //       borderColor: '#FAEBD7',
  //        pointBorderColor: '#fff'
  //     },
  //     {
  //       borderColor: '#FAEBD7',
  //       pointBorderColor: '#fff'
  //     }
  //   ];

  // const timerId = setInterval(() => {
  //   updateGraph();
  // }, 1000); // every 10 seconds get new data and push into vm.data and vm.labels

  // setTimeout(() => {
  //   clearInterval(timerId);
  // }, 20000); // stop timer after 10 seconds

  // function updateGraph() {
    // test++;
    // const time = moment().format('hh:mm:ss');
    // vm.data[0].push(test);
    // vm.labels.push(time);
  //  v
  // }

}
