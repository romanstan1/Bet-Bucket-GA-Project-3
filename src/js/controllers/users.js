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

    if(accy) {
      if(accy !== vm.currentAccumulator) vm.editToggleBoolean = false;
      vm.currentAccumulator = accy;
      vm.currentAccumulator.events.sort((a, b) => a.runnerId - b.runnerId);
      vm.data = [];
      vm.labels = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];

      i = 0;
      console.log(accy);
      createLinesOnGraph(accy);
    }
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
        vm.currentAccumulator.events.sort((a, b) => a.runnerId - b.runnerId);
        displayTrackedEvents(vm.currentAccumulator.id);
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
        vm.currentAccumulator = {};
        editToggle();
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
    if(vm.editToggleBoolean === true) vm.editToggleBoolean = false;
    else vm.editToggleBoolean = true;

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
    if(vm.currentAccumulator.events && vm.currentAccumulator.events.length > 0) {
      const runnerIds = vm.currentAccumulator.events.map((ev) => parseInt(ev.runnerId));
      $http
      .get(`/api/accumulators/${accumulatorId}`)
      .then((response) => {
        vm.runners = response.data.reduce((runners, data) => {
          return runners.concat(data.runners);
        }, [])
        .filter((runner) => runnerIds.includes(runner.selectionId))
        .sort((a, b) => {
          return a.selectionId - b.selectionId;
        });

        vm.runnerPrices = vm.runners.map((element) => {
          return { selectionId: element.selectionId, lastPriceTraded: element.lastPriceTraded };
        });

        // Returns the total gains from all the accumulator odds added in.
        vm.accumulatorOdds = 1;
        vm.runnerPrices.forEach((element) => {
          return vm.accumulatorOdds *= element.lastPriceTraded;
        });

        clearTimeout(t);

        t = setTimeout(() => {
          displayTrackedEvents(accumulatorId);
          if(vm.currentAccumulator.events) updateGraph(i);
          i++;
        }, 1000);
      });

    }
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
        if(vm.runners[p]) vm.data[p][i] = vm.runners[p].lastPriceTraded;
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
  vm.colors = ['rgb(216,78,134)','rgb(49,180,114)', 'rgb(242,61,76)', 'rgb(13,170,176)' ];
  // vm.data = [  [],        [],        ,[]         [],          []       ]
  vm.options = {
    animation: {
      duration: 0
    },
    elements: {
      line: {
        fill: false,
        border: true,
        borderWidth: 5
      },
      point: {
        radius: 4,
        borderWidth: 0.1
      }
    },
    tooltips: {
      enabled: true,
      callbacks: {
        label: function(tooltipItem) {
          return vm.currentAccumulator.events[tooltipItem.datasetIndex].runnerName;
        }
      }
    },
    scales: {
      yAxes: [
        { borderWidth: 3,
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left',
          ticks: {
            min: 1,
            // labelOffset: 40,
            fontStyle: 600,
            fontColor: 'rgba(0,50,56,0.2)',
            padding: 10
          },
          scaleLabel: {
            display: true,
            labelString: 'ODDS',
            fontColor: 'rgba(142,142,142,0.4)',
            fontFamily: 'Open Sans',
            fontStyle: '600'
          },
          gridLines: {
            color: 'white',
            lineWidth: 4,
            //zeroLineWidth: 5,
            // zeroLineColor: 'tomato',
            display: true,
            fill: 'rgba(255,99,132,1)',
            offsetGridlines: false,
            drawBorder: true
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
        ticks: {
          fontStyle: 600,
          fontColor: 'rgba(0,50,56,0.2)',
          padding: 100
        },
        scaleLabel: {
          display: true,
          labelString: 'TIME',
          fontFamily: 'Open Sans',
          fontColor: 'rgba(142,142,142,0.4)',
          fontStyle: '600'
        },
        gridLines: {
          display: true,
          lineWidth: 0.1,
          zeroLineWidth: 4,
          zeroLineColor: 'white'
        }
      }
      ]
    }
  };

  vm.override = [

    {
      label: 'Line chart',
      // borderWidth: 3,
      // pointColor: 'rgba(255,99,132,1)',
      // strokeColor: "rgba(220,220,220,1)",
			// pointColor: "rgba(220,220,220,1)",
			// pointStrokeColor: "#fff",
      // borderColor: 'rgba(255,99,132,1)',
      backgroundColor: 'rgba(255,99,132,1)',
      // hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      // hoverBorderColor: 'rgba(255,99,132,1',
      type: 'line'
    }
  ];
}
