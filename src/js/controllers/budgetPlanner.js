angular.module('travelApp')
  .controller('BudgetPlannerController', BudgetPlannerController);

BudgetPlannerController.$inject= ['Location','Trip','$state', 'FlightService', '$auth', 'TripService'];
function BudgetPlannerController(Location, Trip, $state, FlightService, $auth, TripService) {
  const budgetPlanner = this;

  budgetPlanner.isLoggedIn = $auth.isAuthenticated;
  budgetPlanner.newTrip = {};

  Location.get($state.params, (location) => {
    budgetPlanner.newTrip = {
      origin: 'LGW',
      destination: location.closestAirport,
      destAirportCode: location.airportCode,
      duration: 1,
      flightCost: 0,
      accomCost: 0,
      expenses: 0,
      totalSavings: 0,
      totalCost: 0
    };
  });


  function getFlights() {

    // budgetPlanner.newTrip.flightCost = 500;

    // add duration to start date to get end date
    const tripDuration = parseFloat(budgetPlanner.newTrip.duration);

    budgetPlanner.newTrip.returnDate = moment(budgetPlanner.newTrip.departDate).add(tripDuration, 'days').format('YYYY-MM-DD');
    console.log(budgetPlanner.newTrip.returnDate);

    // if no results, add 7 days to start date and end date



    FlightService
      .getPrice(budgetPlanner.newTrip.origin, budgetPlanner.newTrip.destAirportCode, budgetPlanner.newTrip.departDate, budgetPlanner.newTrip.returnDate)
      .then(
        (successResponse) => {
          console.log(successResponse);
          if (successResponse.totalPrice === 0) {
            console.log('no results found');

            // Re-run search with different date if no flights found

            // FlightService
            //   .getPrice(budgetPlanner.newTrip.origin, budgetPlanner.newTrip.destAirportCode, budgetPlanner.newTrip.departDate, budgetPlanner.newTrip.returnDate)
            //   .then(successResponse => {
            //
            //   }, errorResponse => {
            //
            //   });

          // If flights found, update newTrip with price
          } else {
            console.log('flights found!');
            console.log(successResponse);
            budgetPlanner.newTrip.flightCost = successResponse.totalPrice;
          }
        },
        errorResponse => {
          console.log('Could not retrieve price:', errorResponse);
        }
    );
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
}
