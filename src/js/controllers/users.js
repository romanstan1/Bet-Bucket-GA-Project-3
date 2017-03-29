angular
  .module('YTHO')
  .controller('UsersShowCtrl', UsersShowCtrl);

UsersShowCtrl.$inject = ['$rootScope', '$state', '$auth', '$http', 'Accumulator', 'Event', '$scope', 'filterFilter'];
function UsersShowCtrl($rootScope, $state, $auth, $http, Accumulator, Event, $scope) {
  const vm = this;

  let t = null;

  getUserProfile();

  vm.chosenMarket = null;
  vm.eventButton = true;
  vm.newAccumulator = {};
  vm.editAccumulator = {};

  vm.chooseAccumulator = chooseAccumulator;
  vm.selectMarket = selectMarket;
  vm.addToAccumulator = addToAccumulator;
  vm.delete = accumulatorsDelete;
  vm.displayTrackedEvents = displayTrackedEvents;
  vm.createAccumulator = createAccumulator;
  vm.deleteEvent = deleteEvent;

  function getUserProfile() {
    $http
    .get('/api/profile')
    .then((response) => vm.user = response.data);
  }

  function chooseAccumulator(accy) {
    vm.currentAccumulator = accy;
  }

  function selectMarket(selectedMarket) {
    vm.chosenMarket = selectedMarket;
  }

  function addToAccumulator(runner, index, eventType) {
    vm.newEvent.runnerId = runner.selectionId;
    vm.newEvent.runnerName = vm.chosenMarket.runners[index].runnerName;
    vm.newEvent.eventType = eventType;

    Event
      .save({ accumulatorId: vm.currentAccumulator.id }, vm.newEvent)
      .$promise
      .then((event) => {
        vm.currentAccumulator.events.push(event);
        vm.newEvent = {};
      });
  }

  function accumulatorsDelete(accumulator) {
    Accumulator
      .delete({ id: accumulator.id })
      .$promise
      .then(() => {
        const index = vm.user.accumulators.indexOf(accumulator);
        vm.user.accumulators.splice(index, 1);
        vm.currentAccumulator = null;
      });
  }

  function displayTrackedEvents(accumulatorId) {
    const runnerIds = vm.currentAccumulator.events.map((ev) => parseInt(ev.runnerId));
    $http
      .get(`/api/accumulators/${accumulatorId}`)
      .then((response) => {
        vm.runners = response.data.reduce((runners, data) => {
          return runners.concat(data.runners);
        }, []).filter((runner) => {
          return runnerIds.includes(runner.selectionId);
        });

        vm.runnerNames = [];
        vm.currentAccumulator.events.forEach((runner) => {
          return vm.runnerNames.push(runner.runnerName);
        });

        vm.runnerPrices = [];
        vm.runners.forEach((runner) => {
          return vm.runnerPrices.push(runner.lastPriceTraded);
        });

        clearTimeout(t);
        console.log(vm.runners);
        vm.runners.forEach(function(element) {
          console.log(element.lastPriceTraded);
        });

        // console.log(vm.runners[0].lastPriceTraded);
        t = setTimeout(() => {
          displayTrackedEvents(accumulatorId);
        }, 1000);
      });
  }

  function createAccumulator() {
    if(vm.newAccyForm.$valid) {
      Accumulator
        .save(vm.newAccumulator)
        .$promise
        .then((accy) => vm.user.accumulators.push(accy));
    }
  }

  function renameAccumulator() {
    Accumulator
      .update({ id: vm.currentAccumulator.id }, vm.currentAccumulator)
      .$promise
      .then(() => {
        vm.editToggleBoolean =  true;
      });
  }

  vm.rename = renameAccumulator;


  vm.editToggleBoolean =  true;

  function editToggle(){
    if(vm.editToggleBoolean === true) {
      vm.editToggleBoolean = false;
    } else {
      vm.editToggleBoolean = true;
    }
  }

  vm.editToggle = editToggle;

  vm.deleteEvent = deleteEvent;

  function deleteEvent(event) {
    Event
      .delete({ accumulatorId: vm.currentAccumulator.id,  id: event.id })
      .$promise
      .then(() => {
        const index = vm.currentAccumulator.events.indexOf(event);
        vm.currentAccumulator.events.splice(index, 1);
      });
  }




  vm.labels = ['', '', '', '', '', '', '', '', ''];
  vm.series = [''];
  vm.data = [
    [65, 59, 80, 81, 66, 75, 70, 77, 87]
  ];

  let test = 1;
  const now = moment().format('hh:mm:ss');

  vm.borderWidth = 0;

  setInterval(() => {
    vm.data[0][6] = Math.floor(Math.random()*30);
    vm.data[0][2] = Math.floor(Math.random()*40)+30;
    $scope.$apply();

  }, 3000); // stop timer after 10 seconds

  vm.colors = ['#332f56', '#514d7a', '#2f2a60'];

  vm.options = {
    elements: {
      line: {
        fill: true,
        border: true,
        borderWidth: 3
      },
      point: {
        radius: 0,
        borderWidth: 0
      }
    },
    tooltips: true,
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
          display: true,
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
