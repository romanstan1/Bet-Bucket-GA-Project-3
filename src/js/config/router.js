angular
  .module('YTHO')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'js/views/auth/login.html',
      controller: 'LoginCtrl as login'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'js/views/auth/register.html',
      controller: 'RegisterCtrl as register'
    })
    .state('profile', {
      url: '/profile',
      templateUrl: 'js/views/betfair/betfairSelect.html',
      controller: 'BetfairSelectCtrl as betfair'
    })
    .state('markets', {
      url: '/markets/:eventId',
      templateUrl: 'js/views/betfair/betfairMarkets.html',
      controller: 'BetfairMarketCtrl as betfairM'
    });

  $urlRouterProvider.otherwise('/');
}
