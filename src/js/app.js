angular
  .module('travelApp', ['ngResource', 'ui.router', 'satellizer'])
  .config(Router)
  .config(Auth);

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
      templateUrl: '/templates/home.html',
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
    }) /////////user state
    .state('usersShow', {
      url: '/users/:id/show',
      templateUrl: '/templates/usersShow.html',
      controller: 'UsersShowController as usersShow'
    })
    .state('usersEdit', {
      url: '/users/:id/edit',
      templateUrl: '/templates/usersEdit.html',
      controller: 'UsersEditController as usersEdit'
    })
    ;
  $urlRouterProvider.otherwise('/');
}

Auth.$inject = ['$authProvider'];
function Auth($authProvider){
  $authProvider.loginUrl = '/login';
  $authProvider.signupUrl = '/register';

  $authProvider.tokenPrefix = '';
}
