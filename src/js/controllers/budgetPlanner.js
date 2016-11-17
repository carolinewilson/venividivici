angular.module('travelApp')
  .controller('BudgetPlannerController', BudgetPlannerController);

BudgetPlannerController.$inject= ['Location','Trip','$state', 'FlightService', '$auth', 'TripService'];
function BudgetPlannerController(Location, Trip, $state, FlightService, $auth, TripService) {
  const budgetPlanner = this;

  budgetPlanner.isLoggedIn = $auth.isAuthenticated;
  budgetPlanner.location = Location.get($state.params);
  budgetPlanner.newTrip = {};

  budgetPlanner.newTrip = {
    flightCost: 0,
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

  function getFlights() {

    budgetPlanner.newTrip.flightCost = 500;

    // FlightService
    //   .getPrice(budgetPlanner.newTrip.origin, budgetPlanner.newTrip.destination, budgetPlanner.newTrip.departDate, budgetPlanner.newTrip.returnDate)
    //   .then(
    //     successResponse => {
    //       budgetPlanner.newTrip.flightCost = successResponse.totalPrice;
    //     },
    //     errorResponse => {
    //       console.log('Could not retrieve price:', errorResponse);
    //     }
    // );
  }

  function createTrip() {
    // Calculate total cost
    budgetPlanner.newTrip.totalCost = budgetPlanner.newTrip.flightCost + budgetPlanner.newTrip.expenses + budgetPlanner.newTrip.accomCost - budgetPlanner.newTrip.totalSavings;

    // Get the location id
    budgetPlanner.newTrip.location = budgetPlanner.location._id;

    console.log(budgetPlanner.newTrip);

    // Check if user is logged in
    const loggedIn = budgetPlanner.isLoggedIn();
    // Trip.save(budgetPlanner.newTrip, () => {
    //   console.log('saved!');


    console.log(loggedIn);
      if (loggedIn) {
        console.log('Logged in!');
        // if user is logged in, add reference to user
        budgetPlanner.newTrip.$update(() => {
          console.log(budgetPlanner.newTrip);
        });
      } else {
        console.log('Logged out!');
        // if user isn't logged in, add trip id to local storage, get them to sign in, then add reference to user id to trip (id from local storage)
        TripService.saveTrip(budgetPlanner.newTrip);
        // now go to login/register
        alert('You need to be signed in to save a trip');
        $state.go('register');
      }
    // });

  }

  budgetPlanner.newTrip.totalCost = budgetPlanner.newTrip.flightCost + budgetPlanner.newTrip.expenses + budgetPlanner.newTrip.accomCost - budgetPlanner.newTrip.totalSavings;

  budgetPlanner.createTrip = createTrip;
  budgetPlanner.getFlights = getFlights;

  // console.log(budgetPlanner.budget);
}
