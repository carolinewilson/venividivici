angular.module('travelApp')
  .controller('BudgetPlannerController', BudgetPlannerController);

BudgetPlannerController.$inject= ['Location','Trip','$state', 'FlightService', '$auth', 'TripService'];
function BudgetPlannerController(Location, Trip, $state, FlightService, $auth, TripService) {
  const budgetPlanner = this;

  budgetPlanner.isLoggedIn = $auth.isAuthenticated;

  budgetPlanner.location = Location.get($state.params);
  budgetPlanner.budget = {};

  budgetPlanner.newTrip = {
    location: budgetPlanner.location._id,
    departDate: '2017-01-01',
    returnDate: '2017-01-20',
    origin: 'LGW',
    destination: 'LAX',
    duration: 1,
    accomCost: 0,
    expenses: 0,
    totalSavings: 0,
    totalCost: 0
  };

  budgetPlanner.budget.departDate = budgetPlanner.newTrip.departDate;
  budgetPlanner.budget.origin = budgetPlanner.newTrip.origin;
  budgetPlanner.budget.destination = budgetPlanner.newTrip.destination;
  budgetPlanner.budget.duration = budgetPlanner.newTrip.duration;
  budgetPlanner.budget.accomCost = budgetPlanner.newTrip.accomCost;
  budgetPlanner.budget.expenses = budgetPlanner.newTrip.expenses;
  budgetPlanner.budget.totalSavings = budgetPlanner.newTrip.totalSavings;

  function getFlights() {
    budgetPlanner.newTrip.departDate = budgetPlanner.budget.departDate;
    budgetPlanner.newTrip.origin = budgetPlanner.budget.origin;
    budgetPlanner.newTrip.destination = budgetPlanner.budget.destination;
    budgetPlanner.newTrip.duration = budgetPlanner.budget.duration;
    budgetPlanner.budget.flightCost = budgetPlanner.newTrip.flightCost;
    budgetPlanner.budget.totalCost = budgetPlanner.newTrip.flightCost;
    budgetPlanner.newTrip.totalCost = budgetPlanner.newTrip.flightCost;


    FlightService
      .getPrice(budgetPlanner.newTrip.origin, budgetPlanner.newTrip.destination, budgetPlanner.newTrip.departDate, budgetPlanner.newTrip.returnDate)
      .then(
        successResponse => {
          budgetPlanner.newTrip.flightCost = successResponse.totalPrice;
        },
        errorResponse => {
          console.log('Could not retrieve price:', errorResponse);
        }
    );


  }


  function createTrip() {
    budgetPlanner.newTrip.departDate = budgetPlanner.budget.departDate;
    budgetPlanner.newTrip.origin = budgetPlanner.budget.origin;
    budgetPlanner.newTrip.destination = budgetPlanner.budget.destination;
    budgetPlanner.newTrip.duration = budgetPlanner.budget.duration;
    budgetPlanner.newTrip.flightCost = budgetPlanner.budget.flightCost;
    budgetPlanner.newTrip.expenses = budgetPlanner.budget.expenses;
    budgetPlanner.newTrip.accomCost = budgetPlanner.budget.accom;
    budgetPlanner.newTrip.totalSavings = budgetPlanner.budget.totalSavings;

    budgetPlanner.newTrip.totalCost = budgetPlanner.newTrip.flightCost + (budgetPlanner.budget.expenses * budgetPlanner.budget.duration) + budgetPlanner.budget.accom - budgetPlanner.budget.totalSavings;

    Trip.save(budgetPlanner.newTrip, () => {
      console.log('saved!');

      if (budgetPlanner.isLoggedIn) {
        // if user is logged in, add reference to user
        budgetPlanner.newTrip.$update(() => {
          console.log(budgetPlanner.newTrip);
        });
      } else {
        // if user isn't logged in, add trip id to local storage, get them to sign in, then add reference to user id to trip (id from local storage)
        TripService.saveTrip(budgetPlanner.newTrip);
        // now go to login/register
      }
    });
    console.log(budgetPlanner.newTrip);

  }


  budgetPlanner.budget.totalCost = budgetPlanner.newTrip.flightCost + budgetPlanner.budget.expenses + budgetPlanner.budget.accom;

  budgetPlanner.createTrip = createTrip;
  budgetPlanner.getFlights = getFlights;

  // console.log(budgetPlanner.budget);
}
