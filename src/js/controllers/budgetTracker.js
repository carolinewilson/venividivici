angular.module('travelApp')
  .controller('BudgetTrackerController', BudgetTrackerController);

BudgetTrackerController.$inject = ['Trip', '$state'];

function BudgetTrackerController(Trip, $state) {
  const budgetTracker = this;

  budgetTracker.trip = Trip.get($state.params);

  function save() {
    console.log('I am saving... I am saving... stormy waters, accross the sea...');
  }

  budgetTracker.save = save;
}
