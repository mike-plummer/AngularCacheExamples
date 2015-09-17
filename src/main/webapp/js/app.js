'use strict';

/* App Module */

var cacheApp = angular.module('cacheApp', [
  'ngMaterial',
  'ui.router',
  'caches',
  'cacheServices',
  'cacheDirectives',
  'cacheInterceptors',
  'cacheControllers',
  'cacheControllers'
]);

cacheApp.config(['$httpProvider', '$stateProvider', '$urlRouterProvider', '$mdThemingProvider',
  function($httpProvider, $stateProvider, $urlRouterProvider, $mdThemingProvider) {
    
  /*
   * Setup Angular UI Router
   */
   
  //When no routes are matched, send to default
  $urlRouterProvider.otherwise("/nocache");
  
  // Setup all states (one per cache type). Each one sends the user to the same
  // template but configures a different controller. Angular is awesome!!
  $stateProvider
    .state('nocache', {
      url: "/nocache",
      templateUrl: "partials/poll.html",
      controller: 'NoCacheCtrl as DataCtrl'
    })
    .state('cache', {
      url: "/cache",
      templateUrl: "partials/poll.html",
      controller: 'CacheCtrl as DataCtrl'
    })
    .state('lru', {
      url: "/lru",
      templateUrl: "partials/poll.html",
      controller: 'LRUCacheCtrl as DataCtrl'
    })
    .state('ttl', {
      url: "/ttl",
      templateUrl: "partials/poll.html",
      controller: 'TTLCacheCtrl as DataCtrl'
    })
    .state('sessionstorage', {
      url: "/sessionstorage",
      templateUrl: "partials/poll.html",
      controller: 'SessionStorageCacheCtrl as DataCtrl'
    })
    .state('localstorage', {
      url: "/localstorage",
      templateUrl: "partials/poll.html",
      controller: 'LocalStorageCacheCtrl as DataCtrl'
    });
    
    /*
     * End UI Router configuration.
     */
    
    // Add a simple interceptor just for convenience during development - this has no functional purpose.
    $httpProvider.interceptors.push('serviceCallInterceptor');
    
    // Theming
    $mdThemingProvider.theme('myTheme', 'default')
        .primaryPalette('blue')
        .accentPalette('light-blue')
        .warnPalette('red')
        .backgroundPalette('grey');
    $mdThemingProvider.setDefaultTheme('myTheme');
  }]);
