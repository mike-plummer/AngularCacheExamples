'use strict';

/* Services */

angular.module('cacheServices', ['ngResource'])
  .factory('UncachedData', [
    '$resource',
    function($resource){
      return buildDataResource($resource, null);
    }
  ])
  .factory('CachedData', [
    '$resource',
    function($resource){
      return buildDataResource($resource, true);
    }
  ])
  .factory('LRUCachedData', [
    '$resource', '$cacheFactory',
    function($resource, $cacheFactory){
      return buildDataResource($resource, $cacheFactory('LRU', { capacity: 2 }));
    }
  ])
  .factory('TTLCachedData', [
    'TTLCacheFactory',
    '$resource',
    function(TTLCacheFactory, $resource){
      return buildDataResource($resource, TTLCacheFactory.create('DataCache', 5000));
    }
  ])
  .factory('SessionStorageCachedData', [
    'SessionStorageCacheFactory',
    '$resource',
    function(SessionStorageCacheFactory, $resource){
      return buildDataResource($resource, SessionStorageCacheFactory.create());
    }
  ])
  .factory('LocalStorageCachedData', [
    'LocalStorageCacheFactory',
    '$resource',
    function(LocalStorageCacheFactory, $resource){
      return buildDataResource($resource, LocalStorageCacheFactory.create());
    }
  ]);
  
var buildDataResource = function($resource, cache) {
  return $resource('./data/:version', {version: '1'}, {
    query: {method:'GET', isArray: true, cache: cache}
  });
}
