angular
  .module('YTHO')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: '/'
      // templateUrl: 'js/login.html',
      // controller: 'LoginCtrl as login'
    })
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
      templateUrl: 'js/views/users/show.html',
      controller: 'UsersShowCtrl as usersShow'
    })
    .state('profile.events', {
      url: '/events/:eventType',
      templateUrl: 'js/views/events/index.html',
      controller: 'BetfairSelectCtrl as betfairIndex'
    })
    .state('profile.eventsShow', {
      url: '/events/:eventType/:eventId',
      templateUrl: 'js/views/events/show.html',
      controller: 'BetfairMarketCtrl as betfairShow'
    });

  $urlRouterProvider.otherwise('/');
}
