var app = angular.module('VideoApp', ['ngRoute', 'VideoCtrls', "VideoServices"]);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $routeProvider
  .when('/', {
    templateUrl: 'app/views/videos.html',
    controller: 'HomeCtrl'
  })
  .when('/show', {
    templateUrl: 'app/views/show.html',
    controller: 'HomeCtrl'
  })
  .when('/signup', {
    templateUrl: 'app/views/signup.html',
    controller: 'SignupCtrl'
  })
  .when('/login', {
    templateUrl: 'app/views/login.html',
    controller: 'LoginCtrl'
  })
  .otherwise({
    templateUrl: 'app/views/404.html'
  });

  $locationProvider.html5Mode(true);
}])
.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
}]).run(["$rootScope", "Auth", function($rootScope, Auth) {
  $rootScope.isLoggedIn = function() {
    return Auth.isLoggedIn.apply(Auth);
  };
}]);