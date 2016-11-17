angular
  .module('travelApp', ['ngResource', 'ui.router', 'satellizer','ngMaterial'])
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
    });
  $urlRouterProvider.otherwise('/');
}

Auth.$inject = ['$authProvider'];
function Auth($authProvider){
  $authProvider.loginUrl = '/login';
  $authProvider.signupUrl = '/register';

  $authProvider.tokenPrefix = '';
}
