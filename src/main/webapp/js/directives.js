'use strict';

/* Directives */

angular.module('cacheDirectives', [])
  .directive('servicePoll', [
    '$interval',
    function($interval) {
      return function(scope, element, attrs) {

        var fastRefresh = function() {
            var service = scope.DataCtrl.dataService;
            scope.data1 = service.query({version: 1});
            (scope.pollCount1) ? scope.pollCount1++ : scope.pollCount1 = 1;

            scope.data2 = service.query({version: 2});
            (scope.pollCount2) ? scope.pollCount2++ : scope.pollCount2 = 1;
        };
        
        var slowRefresh = function() {
            var service = scope.DataCtrl.dataService;
            scope.data3 = service.query({version: 3});
            (scope.pollCount3) ? scope.pollCount3++ : scope.pollCount3 = 1;

            scope.data4 = service.query({version: 4});
            (scope.pollCount4) ? scope.pollCount4++ : scope.pollCount4 = 1;
        };
        fastRefresh();
        slowRefresh();
        
        var promise1 = $interval(fastRefresh, 1000);
        var promise2 = $interval(slowRefresh, 4000);

        element.on('$destroy', function() {
          $interval.cancel(promise1);
          $interval.cancel(promise2);
        });
      };
    }
  ])
  .directive('clearLocalStorage', [
    function(){
      return {
        restrict: 'E',
        template: '<button class="button-small pure-button"><i class="fa fa-trash"></i> Clear Local Storage</button>',
        link: function(scope, element, attr) {
          element.on('click', function(event) {
            var localStorage = window.localStorage;
            if (localStorage) {
              localStorage.clear();
            }
          });
        }
      }
    }
  ]);
