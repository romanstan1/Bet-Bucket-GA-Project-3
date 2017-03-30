/* global moment */
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
  vm.runnerNames = [];
  vm.data = [];
  let i = 0;
  vm.chooseAccumulator = chooseAccumulator;
  vm.createAccumulator = createAccumulator;
  vm.displayTrackedEvents = displayTrackedEvents;
  vm.selectMarket = selectMarket;
  vm.addToAccumulator = addToAccumulator;
  vm.rename = renameAccumulator;
  vm.delete = accumulatorsDelete;
  vm.editToggle = editToggle;
  vm.selectMarket = selectMarket;

  //
  // vm.createAccumulator = createAccumulator;
  // vm.chooseAccumulator = chooseAccumulator;
  // vm.addToAccumulator = addToAccumulator;
  // vm.rename = renameAccumulator;
  // vm.delete = accumulatorsDelete;
  //
  // vm.selectMarket = selectMarket;
  // vm.displayTrackedEvents = displayTrackedEvents;

  vm.deleteEvent = deleteEvent;
  vm.editToggleBoolean =  true;

  function getUserProfile() {
    $http
    .get('/api/profile')
    .then((response) => vm.user = response.data);
  }

  function chooseAccumulator(accy) {
    vm.currentAccumulator = accy;
    vm.data = [];
    vm.labels = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];

    i = 0;
    createLinesOnGraph(accy);
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
      });

    vm.data.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
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

  function editToggle(){
    if(vm.editToggleBoolean === true) {
      vm.editToggleBoolean = false;
    } else {
      vm.editToggleBoolean = true;
    }
  }

  function deleteEvent(event) {
    Event
      .delete({ accumulatorId: vm.currentAccumulator.id,  id: event.id })
      .$promise
      .then(() => {
        const index = vm.currentAccumulator.events.indexOf(event);
        vm.currentAccumulator.events.splice(index, 1);
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
        clearTimeout(t);
        // console.log(vm.currentAccumulator.events[0].eventName);
        // console.log(vm.currentAccumulator.events[0].eventType);
        // console.log(vm.currentAccumulator.events[0].marketName);
        // console.log(vm.currentAccumulator.events[0].runnerName);
        t = setTimeout(() => {
          displayTrackedEvents(accumulatorId);
          updateGraph(i);
          i++;
        }, 1000);
      });
  }

  function createLinesOnGraph(accy) {
    vm.currentAccumulator.events.forEach(() => {
      return vm.data.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    });
    console.log('create lines on graph', vm.data);
    displayTrackedEvents(accy.id);
  }

  vm.labels = ['', '', '', '', '', '', '', '', ''];
  vm.series = [''];
  vm.data = [
    [65, 59, 80, 81, 66, 75, 70, 77, 87]
  ];

  function updateGraph(i) {
    const time = moment().format('ss');
    const fullTime = moment().format('hh:mm:ss');
    if(i < 20) {
      for(let p = 0; p < vm.data.length; p++) {
        vm.data[p][i] = vm.runners[p].lastPriceTraded;
        console.log('vmdata', vm.data);
      }
      vm.labels[i] = time;
    } else {
      for (let r = 0; r<19; r++) {
        for(let p = 0; p < vm.data.length; p++) {
          vm.data[p][r] = vm.data[p][r+1];
        }
        vm.labels[r] = vm.labels[r+1];
      }
      for(let p = 0; p < vm.data.length; p++) {
        vm.data[p][19] = vm.runners[p].lastPriceTraded;
      }
      vm.labels[19] = time;
    }
    $scope.$apply();
  }

  vm.options = {
    scaleShowGridLines: false,
    animation: {
      duration: 0
    },
    elements: {
      line: {
        fill: false,
        border: true,
        borderWidth: 8
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
          display: true,
          position: 'left',
          ticks: { min: 0, max: 12 },
          gridLines: {
            display: false
          }
        },
        {
          id: 'y-axis-2',
          type: 'linear',
          display: false,
          position: 'right',
          gridLines: {
            display: false
          }
        }
      ],
      xAxes: [ {
        display: true,
        gridLines: {
          display: false
        }
      }
      ]
    }
  };
}
