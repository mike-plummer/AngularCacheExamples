# Angular Cache Examples
Examples of caches in AngularJS including alternative cache implementations.

## Caching in Angular
By default, AngularJS does not cache the results of service calls. Often this is the desired behavior but once applications begin scaling or increasing in complexity this behavior can begin to bog things down. To help alleviate this bottleneck Angular provides $cacheFactory which is a simple in-memory cache implementation that can be applied to any $http or $resource request. $cacheFactory allows simple and LRU caches to be created and destroyed on-demand, giving the developer a level of control over resource caching.

## Alternatives
There are many alternative cache implementations that have been developed over the past few years that offer far superior caching support. Google can tell you all about them.

## Examples
This application is a trivial example of how caches can be introduced into your application and implements a few alternative caches to show how they can be created.

### No Caching (Default)
Each and every service call hits the server - this guarantees that the user sees the latest data but introduces load to the server and churn to the client.
### Standard Cache
The first response for each service URL is cached and used for the remainder of the application's lifetime. Future calls to the same URL will not hit the server.
### LRU Cache
The cache is created with a fixed size. Once capacity is reached the least-recently-used item is evicted from the cache to make room. Future calls to the URL that was evicted will hit the server and be placed back into the cache, potentially evicting a less-recently-used item.
### TTL Cache
The cache is created with no fixed size but each entry in the cache is only allowed to reside for a fixed amount of time. Calls to a URL will hit the cache during the TTL but will then hit the server once the cache entry is evicted. A call to the server will result in entries being re-added to the cache with a refreshed TTL.
### Session Storage
The cache leverages browser-provided Session Storage to supply a Standard Cache. This allows cache entries to persist for the duration of the client's session meaning they are durable across browser refreshes. If the user closes the browser or their session expires the cache will be invalidated.
### Local Storage
The cache leverages browser-provided Local Storage to supply a Standard Cache. This writes cache entries to disk which means they are permanently durable on a per-machine basis. This cache must be explicitly cleared by program logic but may also be cleared if the user deletes browser data.

## Usage
This example application uses Spring Boot to host a simple ReST service and the resources for the UI. To launch:

1. Navigate to the project's root directory in a command prompt.
2. `mvn spring-boot:run`
3. Open `localhost:8080/angular-cache` in your browser.
4. To quit type `Ctrl-C` in the command prompt.

## License
This code is provided under the terms of the MIT license: basically you're free to do whatever you want with it, but no guarantees are made to its validity, stability, or safety. All works referenced by or utilized by this project are the property of their respective copyright holders and retain licensing that may be more restrictive.
