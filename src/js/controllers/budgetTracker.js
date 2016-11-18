angular.module('travelApp')
  .controller('BudgetTrackerController', BudgetTrackerController);

BudgetTrackerController.$inject = ['Trip', '$state'];

function BudgetTrackerController(Trip, $state) {
  const budgetTracker = this;

  budgetTracker.trip = Trip.get($state.params);

  function save() {
    budgetTracker.trip.$update((data) => {
      console.log('trip saved!', data);
    });
  }

  budgetTracker.save = save;
}
