angular.module('travelApp')
  .controller('BudgetPlannerController', BudgetPlannerController);

BudgetPlannerController.$inject= ['Location','Trip','User','$state', 'FlightService', '$auth', 'TripService', '$window', '$scope'];
function BudgetPlannerController(Location, Trip, User, $state, FlightService, $auth, TripService, $window, $scope) {
  const budgetPlanner = this;

  const moment = $window.moment;

  budgetPlanner.isLoggedIn = $auth.isAuthenticated;
  budgetPlanner.newTrip = {};
  budgetPlanner.location = Location.get($state.params);

  const userId = $auth.getPayload()._id;

  User.get({ id: userId }, (user) => {


    const airport = user.preferredAirport;

    Location.get($state.params, (location) => {
      budgetPlanner.newTrip = {
        origin: 'LGW',
        destination: location.closestAirport,
        destAirportCode: location.airportCode,
        duration: 7,
        totalSavings: 0
      };

      budgetPlanner.newTrip.origin = airport;
    });
  });

  // Update pie chart
  $scope.$watchGroup([
    () => budgetPlanner.newTrip.flightCost,
    () => budgetPlanner.newTrip.accomCost,
    () => budgetPlanner.newTrip.expenses
  ], () => {
    updateChart();
  });

  function updateChart() {

    budgetPlanner.labels = ['Flights', 'Accomodation', 'Spending Money'];
    budgetPlanner.data = [
      budgetPlanner.newTrip.flightCost,
      budgetPlanner.newTrip.accomCost,
      budgetPlanner.newTrip.expenses
    ];
  }

  function getFlights() {

    // add duration to start date to get end date
    const tripDuration = parseFloat(budgetPlanner.newTrip.duration);

    budgetPlanner.newTrip.returnDate = moment(budgetPlanner.newTrip.departDate).add(tripDuration, 'days').format('YYYY-MM-DD');
    // console.log(budgetPlanner.newTrip.returnDate);

    // budgetPlanner.newTrip.flightCost = 500;
    let flightFound = false;
    let i = 0;

    while (!flightFound && i <= 31) {

      FlightService
        .getPrice(budgetPlanner.newTrip.origin, budgetPlanner.newTrip.destAirportCode, budgetPlanner.newTrip.departDate, budgetPlanner.newTrip.returnDate)
        .then(
          successResponse => {
            const quote = successResponse.response.Quotes[0];
            const carrier = successResponse.response.Carriers[0];

            if (quote) {
              // If flights found, update newTrip with price
              // console.log(successResponse);
              budgetPlanner.newTrip.flightCost = quote.MinPrice;
              budgetPlanner.newTrip.outboundLeg = moment(quote.OutboundLeg.DepartureDate).format('Do MMM');
              budgetPlanner.newTrip.inboundLeg = moment(quote.InboundLeg.DepartureDate).format('Do MMM');
              budgetPlanner.newTrip.carrier = carrier.Name;
              return flightFound = true;
            } else {
              budgetPlanner.newTrip.noFlightsMsg = 'We can\'t find flights for these dates. Try a different date.';
              // console.log('no flights found');
            }
          },
          errorResponse => {
            budgetPlanner.newTrip.searchString = 'Oh dear, there seems to be a problem. Try again later.';
            console.log(errorResponse);
          }
      );


      budgetPlanner.newTrip.departDate = moment(budgetPlanner.newTrip.departDate).add(1, 'days').format('YYYY-MM-DD');
      budgetPlanner.newTrip.returnDate = moment(budgetPlanner.newTrip.returnDate).add(1, 'days').format('YYYY-MM-DD');
      i++;
    }
  }

  function createTrip() {

    // Calculate total cost
    budgetPlanner.newTrip.totalCost = budgetPlanner.newTrip.flightCost + budgetPlanner.newTrip.expenses + budgetPlanner.newTrip.accomCost - budgetPlanner.newTrip.totalSavings;

    // Get the location id
    budgetPlanner.newTrip.location = budgetPlanner.location._id;

    // Check if user is logged in
    const loggedIn = budgetPlanner.isLoggedIn();

    if (loggedIn) {
      budgetPlanner.newTrip.user = $window.localStorage.getItem('userId');
      Trip.save(budgetPlanner.newTrip, (data) => {
        console.log('saved ', data);
        $state.go('budgetTracker', { id: data._id });
      });
    } else {
      // if user isn't logged in, add trip id to local storage
      TripService.saveTrip(budgetPlanner.newTrip);

      alert('You need to be signed in to save a trip');

      // get them to sign in, then add reference to user id to trip (id from local storage)
      $state.go('register');
    }
  }

  budgetPlanner.newTrip.totalCost = budgetPlanner.newTrip.flightCost + budgetPlanner.newTrip.expenses + budgetPlanner.newTrip.accomCost - budgetPlanner.newTrip.totalSavings;

  budgetPlanner.createTrip = createTrip;
  budgetPlanner.getFlights = getFlights;
}
