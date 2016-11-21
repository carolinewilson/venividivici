angular.module('travelApp')
  .controller('BudgetTrackerController', BudgetTrackerController);

BudgetTrackerController.$inject = ['Trip', '$state','$scope', '$window'];

function BudgetTrackerController(Trip, $state, $scope, $window) {
  const budgetTracker = this;

  const moment = $window.moment;

  budgetTracker.trip = Trip.get($state.params, () => {

    budgetTracker.pcSaved = (budgetTracker.trip.totalSavings / (budgetTracker.trip.flightCost + budgetTracker.trip.expenses + budgetTracker.trip.accomCost)) * 100;

    calcSavingsGoals();
  });

  function calcSavingsGoals(){

    const now = moment();
    const depart = moment(budgetTracker.trip.departDate);
    const daysLeft = depart.diff(now, 'days');
    const weeksLeft = daysLeft/7;

    budgetTracker.timeFromNow = moment(depart).from(now);
    budgetTracker.weeklySavingGoal = Math.ceil(((budgetTracker.trip.flightCost + budgetTracker.trip.expenses + budgetTracker.trip.accomCost) - budgetTracker.trip.totalSavings)/weeksLeft);
  }
  function calcPcSaved() {

    budgetTracker.pcSaved = (budgetTracker.trip.totalSavings / (budgetTracker.trip.flightCost + budgetTracker.trip.expenses + budgetTracker.trip.accomCost)) * 100;

    return Math.ceil(budgetTracker.pcSaved);
  }

  // Update goals
  $scope.$watchGroup([
    () => budgetTracker.trip.totalSavings
  ],() => {
    calcSavingsGoals();
  });

  // Update pie chart
  $scope.$watchGroup([
    () => budgetTracker.trip.flightCost,
    () => budgetTracker.trip.accomCost,
    () => budgetTracker.trip.expenses
  ], () => {
    updateChart();
    calcSavingsGoals();
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
      calcPcSaved();
    });
  }

  budgetTracker.save = save;
  budgetTracker.calcPcSaved = calcPcSaved;
}
