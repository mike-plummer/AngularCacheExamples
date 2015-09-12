'use strict';

/* Controllers */

angular.module('cacheControllers', ['cacheServices'])
.controller('NoCacheCtrl', ['UncachedData',
  function(UncachedData) {
    var vm = this;
    vm.dataService = UncachedData;
    vm.cacheType = 'No Cache';
  }])
.controller('CacheCtrl', ['CachedData',
  function(CachedData) {
    var vm = this;
    vm.dataService = CachedData;
    vm.cacheType = '$http Cache';
  }])
.controller('LRUCacheCtrl', ['LRUCachedData',
  function(LRUCachedData) {
    var vm = this;
    vm.dataService = LRUCachedData;
    vm.cacheType = 'LRU Cache';
  }])
.controller('TTLCacheCtrl', ['TTLCachedData',
  function(TTLCachedData) {
    var vm = this;
    vm.dataService = TTLCachedData;
    vm.cacheType = 'TTL Cache';
  }])
.controller('SessionStorageCacheCtrl', ['SessionStorageCachedData',
  function(SessionStorageCachedData) {
    var vm = this;
    vm.dataService = SessionStorageCachedData;
    vm.cacheType = 'Session Storage Cache';
  }])
.controller('LocalStorageCacheCtrl', ['LocalStorageCachedData',
  function(LocalStorageCachedData) {
    var vm = this;
    vm.dataService = LocalStorageCachedData;
    vm.cacheType = 'Local Storage Cache';
    vm.localStorage = true;
  }]);
