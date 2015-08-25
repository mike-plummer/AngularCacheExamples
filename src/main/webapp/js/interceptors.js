'use strict';

/* Interceptors */

angular.module('cacheInterceptors', [])
  .factory('serviceCallInterceptor', ['$rootScope',
    function($rootScope){
      return {
        request: function(request) {
            return request;
        },
        response: function(response) {
            return response;
        }
      }
    }
  ]);
  