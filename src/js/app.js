angular
  .module('travelApp', ['ngResource', 'ui.router', 'satellizer','chart.js'])
  .config(Router)
  .config(Auth);
// 'ngMessage'
Router.$inject = ['$stateProvider', '$urlRouterProvider'];
function Router($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('register', {
      url: '/register',
      templateUrl: '/templates/register.html',
      controller: 'RegisterController as register'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/templates/login.html',
      controller: 'LoginController as login'
    })
    .state('locationsNew', {
      url: '/locations/new',
      templateUrl: '/templates/locationsNew.html',
      controller: 'LocationsNewController as locationsNew'
    })
    .state('locationsEdit', {
      url: '/locations/:id/edit',
      templateUrl: '/templates/locationsEdit.html',
      controller: 'LocationsEditController as locationsEdit'
    })
    .state('home', {
      url: '/',
      templateUrl: '/templates/home.html'
    })
    .state('gallery', {
      url: '/gallery',
      templateUrl: '/templates/gallery.html',
      controller: 'LocationsIndexController as locationsIndex'
    })
    .state('locationsShow', {
      url: '/locations/:id',
      templateUrl: '/templates/locationsShow.html',
      controller: 'LocationsShowController as locationsShow'
    })
    .state('budgetPlanner', {
      url: '/locations/:id/budget',
      templateUrl: '/templates/budgetPlanner.html',
      controller: 'BudgetPlannerController as budgetPlanner'
    })
    .state('budgetTracker', {
      url: '/trips/:id',
      templateUrl: '/templates/budgetTracker.html',
      controller: 'BudgetTrackerController as budgetTracker'
    }) /////////user state
    .state('profileShow', {
      url: '/me',
      templateUrl: '/templates/profileShow.html',
      controller: 'ProfileShowController as profileShow'
    })
    .state('adventurersShow', {
      url: '/adventurer/:id',
      templateUrl: '/templates/adventurersShow.html',
      controller: 'AdventurersShowController as adventurersShow'
    })
    .state('profileEdit', {
      url: '/me/:id/edit',
      templateUrl: '/templates/profileEdit.html',
      controller: 'ProfileEditController as profileEdit'
    });
  $urlRouterProvider.otherwise('/');
}

Auth.$inject = ['$authProvider'];
function Auth($authProvider){
  $authProvider.loginUrl = '/login';
  $authProvider.signupUrl = '/register';

  $authProvider.tokenPrefix = '';
  $authProvider.facebook({
    clientId: '1750924558566461'
    // clientId: '713597228794948'
  });
}
