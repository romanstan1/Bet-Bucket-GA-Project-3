/* global moment */
angular
  .module('YTHO')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', '$state', '$auth', '$scope'];
function MainCtrl($rootScope, $state, $auth, $scope) {
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



  vm.labels = ['', '', '', '', '', '', '', '', ''];
  vm.series = ['sA','sb', 'sb' ];
  vm.data = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];

  vm.borderWidth = 0;

  setTimeout(() => {
    moveAnimation();
  }, 400);

  function moveAnimation() {

    vm.data[0][0] = 75;
    vm.data[0][1] = Math.floor(Math.random()*15)+63;
    vm.data[0][2] = 70;
    vm.data[0][3] = Math.floor(Math.random()*15)+70;
    vm.data[0][4] = 78;
    vm.data[0][5] = 90;
    vm.data[0][6] = Math.floor(Math.random()*5)+77;
    vm.data[0][7] = Math.floor(Math.random()*5)+85;
    vm.data[0][8] = Math.floor(Math.random()*25)+80;

    vm.data[1][0] = 50;
    vm.data[1][1] = Math.floor(Math.random()*25)+50;
    vm.data[1][2] = Math.floor(Math.random()*5)+60;
    vm.data[1][3] = Math.floor(Math.random()*30)+50;
    vm.data[1][4] = Math.floor(Math.random()*20)+55;
    vm.data[1][5] = Math.floor(Math.random()*20)+55;
    vm.data[1][6] = 46;
    vm.data[1][7] = 44;
    vm.data[1][8] = Math.floor(Math.random()*15)+55;

    vm.data[2][0] = 20;
    vm.data[2][1] = Math.floor(Math.random()*20)+10;
    vm.data[2][2] = Math.floor(Math.random()*20)+10;
    vm.data[2][3] = Math.floor(Math.random()*5)+15;
    vm.data[2][4] = Math.floor(Math.random()*5)+30;
    vm.data[2][5] = Math.floor(Math.random()*5)+25;
    vm.data[2][6] = Math.floor(Math.random()*5)+25;
    vm.data[2][7] = 37;
    vm.data[2][8] = Math.floor(Math.random()*15)+10;

    $scope.$apply();

    setTimeout(() => {
      moveAnimation();
    }, 4000);
  }

  vm.colors = ['rgba(0,50,56,1)', 'rgba(1,75,79,1)', 'rgba(0,132,139,1)'];
  vm.options = {
    animation: {
      duration: 6000
    },
    elements: {
      line: {
        fill: true,
        border: false,
        borderWidth: 0.1,
        opacity: 1
      },
      point: {
        //fill: ['#062735'],
        background: '#062735',
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
          ticks: { min: 0, max: 100 },
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
}
