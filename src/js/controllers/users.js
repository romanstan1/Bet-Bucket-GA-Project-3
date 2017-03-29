angular
  .module('YTHO')
  .controller('UsersShowCtrl', UsersShowCtrl);

UsersShowCtrl.$inject = ['$rootScope', '$state', '$auth', '$http', 'Accumulator', 'Event', 'filterFilter'];
function UsersShowCtrl($rootScope, $state, $auth, $http, Accumulator, Event, filterFilter) {
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

        clearTimeout(t);

        t = setTimeout(() => {
          displayTrackedEvents(accumulatorId);
        }, 1000);
      });
  }

  // API
  // events = [
  //   market1 = {
  //     runners = [
  //       { selectionId: 3242 },
  //       { selectionId: 5665 },
  //       { selectionId: 436754 }
  //     ]
  //   },
  //   market2 = {
  //   }
  // ]
  // for markets in events
  //   for runner in events.runners
  //     return runner.selectionId if it is included in accumulator.events[all of them].runnerId
  //
  // ACCUMULATOR
  // events = [
  //   event1: {
  //     { runnerId: 3242 }
  //   },
  //   event2: {
  //
  //   }
  // ]






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
}
