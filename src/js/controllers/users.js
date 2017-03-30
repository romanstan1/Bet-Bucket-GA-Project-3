/* global moment */
angular
  .module('YTHO')
  .controller('UsersShowCtrl', UsersShowCtrl);

UsersShowCtrl.$inject = ['$rootScope', '$state', '$auth', '$http', 'Accumulator', 'Event', '$scope', 'filterFilter'];
function UsersShowCtrl($rootScope, $state, $auth, $http, Accumulator, Event, $scope) {
  const vm = this;

  let t = null;
  let i = 0;

  getUserProfile();

  vm.chosenMarket = null;
  vm.eventButton = true;
  vm.newAccumulator = {};
  vm.editAccumulator = {};
  vm.runnerNames = [];
  vm.data = [];
  vm.chooseAccumulator = chooseAccumulator;
  vm.createAccumulator = createAccumulator;
  vm.displayTrackedEvents = displayTrackedEvents;
  vm.selectMarket = selectMarket;
  vm.addToAccumulator = addToAccumulator;
  vm.rename = renameAccumulator;
  vm.delete = accumulatorsDelete;
  vm.editToggle = editToggle;
  vm.selectMarket = selectMarket;
  vm.deleteEvent = deleteEvent;


  function getUserProfile() {
    $http
    .get('/api/profile')
    .then((response) => {
      vm.user = response.data;
    });
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

    vm.data = [];
    vm.labels = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];

    i = 0;
    createLinesOnGraph(vm.currentAccumulator);

    Event
      .save({ accumulatorId: vm.currentAccumulator.id }, vm.newEvent)
      .$promise
      .then((event) => {
        vm.currentAccumulator.events.push(event);
      });

    vm.data.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
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

  vm.editToggleBoolean =  true;

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
        vm.data = [];
        vm.labels = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];

        i = 0;
        createLinesOnGraph(vm.currentAccumulator);
      });
  }

  function displayTrackedEvents(accumulatorId) {
    const runnerIds = vm.currentAccumulator.events.map((ev) => parseInt(ev.runnerId));
    $http
      .get(`/api/accumulators/${accumulatorId}`)
      .then((response) => {
        vm.runners = response.data.reduce((runners, data) => {
          return runners.concat(data.runners);
        }, [])
        .filter((runner) => runnerIds.includes(runner.selectionId));

        vm.runnerPrices = [];
        vm.runners.forEach((element) => vm.runnerPrices.push(element.lastPriceTraded));


        vm.accumulatorOdds = 1;
        vm.runnerPrices.forEach((element) => {
          return vm.accumulatorOdds *= element;
        });

        clearTimeout(t);

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
    displayTrackedEvents(accy.id);
  }

  function updateGraph(i) {
    const time = moment().format('mm:ss');

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
  //             1           2          3         4          5
  vm.colors = ['#4286f4','#833b89', '#639b5e', '#b72630', '#e0dd2c'];
  // vm.data = [  [],        [],        ,[]         [],          []       ]
  vm.options = {
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
          ticks: { min: 1 },
          gridLines: {
            display: true
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
          display: true
        }
      }
      ]
    }
  };
}
