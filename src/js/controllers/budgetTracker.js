angular.module('travelApp')
  .controller('BudgetTrackerController', BudgetTrackerController);

BudgetTrackerController.$inject = ['Trip', '$state'];

function BudgetTrackerController(Trip, $state) {
  const budgetTracker = this;

  budgetTracker.trip = Trip.get($state.params);
  budgetTracker.pcSaved = (budgetTracker.trip.totalSavings / (budgetTracker.trip.flightCost + budgetTracker.trip.expenses + budgetTracker.trip.accomCost)) * 100;

  function calcPcSaved() {

    budgetTracker.pcSaved = (budgetTracker.trip.totalSavings / (budgetTracker.trip.flightCost + budgetTracker.trip.expenses + budgetTracker.trip.accomCost)) * 100;

    return Math.ceil(budgetTracker.pcSaved);
  }


  function save() {
    budgetTracker.trip.$update((data) => {
      console.log('trip saved!', data);
    });
  }

  budgetTracker.save = save;
  budgetTracker.calcPcSaved = calcPcSaved;
}
