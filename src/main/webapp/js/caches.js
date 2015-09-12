'use strict';

/* Caches */

angular.module('caches', [])
  .factory('TTLCacheFactory', [
    '$cacheFactory', '$timeout',
    function($cacheFactory, $timeout){

      return {
        create: function(name, ttl) {

            if (typeof(name) !== 'string' || typeof(ttl) !== 'number') {
                throw "Name and TTL must be provided";
            }
            var backingCache = $cacheFactory(name);
            var timeouts = {};

            return {
                info: backingCache.info(),
                put: function(key, value) {
                    if (timeouts[key]) {
                        $timeout.cancel(timeouts[key]);
                    }
                    backingCache.put(key, value);
                    var promise = $timeout(function() {
                        backingCache.remove(key);
                    }, ttl);
                    timeouts[key] = promise;
                },
                get: backingCache.get,
                remove: function(key) {
                    if (timeouts[key]) {
                        $timeout.cancel(timeouts[key]);
                        delete timeouts[key];
                    }
                    backingCache.remove(key);
                },
                removeAll: function() {
                    Object.getOwnPropertyNames(timeouts).forEach(function(key) {
                        $timeout.cancel(timeouts[key]);
                        delete timeouts[key];
                    });
                    backingCache.removeAll();
                },
                destroy: function() {
                    backingCache.destroy();
                    backingCache = null;
                }
            }
        }
      };
    }
  ])
  .factory('SessionStorageCacheFactory', [
    '$q', '$cacheFactory',
    function($q, $cacheFactory){
      return {
        create: function() {
          var sessionStorage = window.sessionStorage;
          if (!sessionStorage) {
            throw 'Session Storage is not supported';
          }

          return buildStorageCache($q, sessionStorage);
        }
      }
    }
  ])
  .factory('LocalStorageCacheFactory', [
    '$q', '$cacheFactory',
    function($q, $cacheFactory){
      return {
        create: function() {
          var localStorage = window.localStorage;
          if (!localStorage) {
            throw 'Local Storage is not supported';
          }

          return buildStorageCache($q, localStorage);
        }
      }
    }
  ]);

var buildStorageCache = function($q, storage) {
    return {
    info: function() {
        return {
            id: name,
            size: storage.length,
            options: {}
        }
    },
    put: function(key, value) {
        $q.when(value, function(resolvedValue){
          var data = resolvedValue['data'];
          if (data !== undefined) {
            storage.setItem(key, data);
          }
        });
    },
    get: function(key){
        if (!storage.hasOwnProperty(key)) {
          return undefined;
        }
        return storage.getItem(key);
    },
    remove: function(key) {
        storage.removeItem(key);
    },
    removeAll: function() {
        storage.clear();
    },
    destroy: function() {
        this.removeAll();
    }
  }
};
