/*
var CACHE = 'FoyerDesignSystem-1.0';
// Install stage sets up the offline page in the cache and opens a new cache.
self.addEventListener('install', function(event) {
	event.waitUntil( preLoad() );
});

var preLoad = function(){
	//console.info('[SW] Install Event processing');
	return caches.open(CACHE).then(function(cache) {
		//console.info('[SW] Cached index and offline page during Install');
		return cache.addAll( ['/offline.html', '/index.html'] );
	});
}

self.addEventListener('fetch', function(event) {
	if ( event.request.method !== "GET" ) return;

	console.info('[SW] The service worker is serving the asset.');
	event.respondWith(checkResponse(event.request).catch(function() {
		return returnFromCache(event.request)}
	));
	event.waitUntil(addToCache(event.request));
});

var checkResponse = function(request){
	return new Promise(function(fulfill, reject) {
		fetch(request).then(function(response){
			if(response.status !== 404) {
				fulfill(response)
			} else {
				reject()
			}
		}, reject)
	});
};

var addToCache = function(request){
	return caches.open(CACHE).then(function (cache) {
		return fetch(request).then(function (response) {
			//console.info('[SW] add page to offline ' + response.url )
			return cache.put(request, response);
		});
	});
};

var returnFromCache = function(request){
	return caches.open(CACHE).then(function (cache) {
		return cache.match(request).then(function (matching) {
			if(!matching || matching.status == 404) {
				return cache.match('offline.html')
			} else {
				return matching
			}
		});
	});
};
*/

/**
 * This is a "Offline + Copy of visited page" politics.
 */

const CACHE = "pwabuilder-offline-page";
const offlineFallbackPage = "/offline.html";
const preCachedResources = [];
const preCached = preCachedResources.push( offlineFallbackPage );

// Install stage sets up the offline page in the cache and opens a new cache
self.addEventListener("install", function (event) {
  console.log("[PWA Builder] Install Event processing");

  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
		return Promise.all(
			preCached.map(function (url) {
				return cache.add(url).catch(function(reason) {
					console.log(reason);
				});
			})
		);
    })
  );
});

// If any fetch fails, it will look for the request in the cache and serve it from there first
self.addEventListener("fetch", function (event) {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then(function (response) {
        console.log("[PWA Builder] add page to offline cache: " + response.url);

        // If request was success, add or update it in the cache
        event.waitUntil(updateCache(event.request, response.clone()));

        return response;
      })
      .catch(function (error) {
        console.log("[PWA Builder] Network request Failed. Serving content from cache: " + error);
        return fromCache(event.request);
      })
  );
});

function fromCache(request) {
  // Check to see if you have it in the cache
  // Return response
  // If not in the cache, then return the offline page
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      if (!matching || matching.status === 404) {
        // The following validates that the request was for a navigation to a new document
        if (request.destination !== "document" || request.mode !== "navigate") {
          return Promise.reject("no-match");
        }

        return cache.match(offlineFallbackPage);
      }

      return matching;
    });
  });
}

function updateCache(request, response) {
  return caches.open(CACHE).then(function (cache) {
    return cache.put(request, response);
  });
}
