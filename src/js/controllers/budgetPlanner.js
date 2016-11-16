angular.module('travelApp')
  .controller('BudgetPlannerController', BudgetPlannerController);

BudgetPlannerController.$inject= ['Location','$state', '$http'];
function BudgetPlannerController(Location, $state, $http) {
  const budgetPlanner = this;

  budgetPlanner.location = Location.get($state.params);
  budgetPlanner.budget = {};

  budgetPlanner.tempTrip = {
    location: budgetPlanner.location,
    startDate: '2017-01-01',
    startAirport: 'LGW',
    endAirport: 'LAX',
    duration: 1,
    accomCost: 0,
    expenses: 0,
    totalSavings: 0,
    totalCost: 0
  };

  budgetPlanner.budget.startDate = budgetPlanner.tempTrip.startDate;
  budgetPlanner.budget.startAirport = budgetPlanner.tempTrip.startAirport;
  budgetPlanner.budget.endAirport = budgetPlanner.tempTrip.endAirport;
  budgetPlanner.budget.duration = budgetPlanner.tempTrip.duration;
  budgetPlanner.budget.accomCost = budgetPlanner.tempTrip.accomCost;
  budgetPlanner.budget.expenses = budgetPlanner.tempTrip.expenses;
  budgetPlanner.budget.totalSavings = budgetPlanner.tempTrip.totalSavings;

  function getFlights() {
    budgetPlanner.tempTrip.startDate = budgetPlanner.budget.startDate;
    budgetPlanner.tempTrip.startAirport = budgetPlanner.budget.startAirport;
    budgetPlanner.tempTrip.endAirport = budgetPlanner.budget.endAirport;
    budgetPlanner.tempTrip.duration = budgetPlanner.budget.duration;
    budgetPlanner.tempTrip.flightCost = 500;
    budgetPlanner.budget.flightCost = budgetPlanner.tempTrip.flightCost;
    budgetPlanner.budget.totalCost = budgetPlanner.tempTrip.flightCost;
    budgetPlanner.tempTrip.totalCost = budgetPlanner.tempTrip.flightCost;


    getPriceFromSkyscanner();
  }

  function getPriceFromSkyscanner() {
    const requestUrl = `http://partners.api.skyscanner.net/apiservices/browsequotes/v1.0/UK/GBP/en-GB/${budgetPlanner.tempTrip.startAirport}/${budgetPlanner.tempTrip.endAirport}/2017-01-01/2017-01-08?apiKey=da458996433134676343179434984723`;

    $http({
      method: 'GET',
      url: requestUrl,
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:8000',
        'Accept': 'application/json'
      }
    }).then(function successCallback(response) {
      console.log(response);
    }, function errorCallback(response) {
      console.log(response);
    });
  }

  function create() {
    budgetPlanner.tempTrip.startDate = budgetPlanner.budget.startDate;
    budgetPlanner.tempTrip.startAirport = budgetPlanner.budget.startAirport;
    budgetPlanner.tempTrip.endAirport = budgetPlanner.budget.endAirport;
    budgetPlanner.tempTrip.duration = budgetPlanner.budget.duration;
    budgetPlanner.tempTrip.flightCost = budgetPlanner.budget.flightCost;
    budgetPlanner.tempTrip.expenses = budgetPlanner.budget.expenses;
    budgetPlanner.tempTrip.accomCost = budgetPlanner.budget.accom;
    budgetPlanner.tempTrip.totalSavings = budgetPlanner.budget.totalSavings;

    budgetPlanner.tempTrip.totalCost = budgetPlanner.tempTrip.flightCost + (budgetPlanner.budget.expenses * budgetPlanner.budget.duration) + budgetPlanner.budget.accom - budgetPlanner.budget.totalSavings;

    console.log(budgetPlanner.tempTrip);

  }


  budgetPlanner.budget.totalCost = budgetPlanner.tempTrip.flightCost + budgetPlanner.budget.expenses + budgetPlanner.budget.accom;

  budgetPlanner.create = create;
  budgetPlanner.getFlights = getFlights;

  console.log(budgetPlanner.budget);
}
