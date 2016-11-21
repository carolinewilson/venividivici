angular.module('travelApp')
  .controller('BudgetTrackerController', BudgetTrackerController);

BudgetTrackerController.$inject = ['Trip', '$state','$scope', '$window'];

function BudgetTrackerController(Trip, $state, $scope, $window) {
  const budgetTracker = this;

  const moment = $window.moment;

  budgetTracker.trip = Trip.get($state.params);
  budgetTracker.percentSaved = (budgetTracker.trip.totalSavings / (budgetTracker.trip.flightCost + budgetTracker.trip.expenses + budgetTracker.trip.accomCost)) * 100;

  function calcPercentSaved() {

    budgetTracker.percentSaved = (budgetTracker.trip.totalSavings / (budgetTracker.trip.flightCost + budgetTracker.trip.expenses + budgetTracker.trip.accomCost)) * 100;

    return Math.ceil(budgetTracker.percentSaved);
  }

  // Update pie chart
  $scope.$watchGroup([
    () => budgetTracker.trip.flightCost,
    () => budgetTracker.trip.accomCost,
    () => budgetTracker.trip.expenses
  ], () => {
    updateChart();
  });

  function updateChart() {

    budgetTracker.labels = ['Flights', 'Accomodation', 'Spending Money'];
    budgetTracker.data = [
      budgetTracker.trip.flightCost,
      budgetTracker.trip.accomCost,
      budgetTracker.trip.expenses
    ];
  }

  function save() {
    Trip.update({ id: budgetTracker.trip._id }, budgetTracker.trip, () => {
      calcPercentSaved();
    });
  }

  budgetTracker.save = save;
  budgetTracker.calcPercentSaved = calcPercentSaved;
}
