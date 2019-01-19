'use strict';

angular.module('myApp', [
  'myApp.chart',
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/chart'});
}]);
