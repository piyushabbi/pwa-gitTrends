/**
 * Service Worker LifeCycle
 * INSTALL: 1st step. SW installed in browser for given scope. Best place to cache assets.
 * ACTIVATE: After changes, SW updates but changes are not reflected untill all sessions with previous worker is deleted and app is relaunched. Best place to delete previous cache and so that the new cache can take over.
 * FETCH: Not a life cycle. It's an Event. Used to intercept requests for assets. All requests go through this event.
 */

var cacheName = 'PWA-Demo';
var filesToCache = [
	'/index.html',
	'css/materialize.min.css',
	'/css/app.css',
	'js/app.js',
	'/fonts/roboto/Roboto-Regular.woff'
];

/**
 * INSTALL PHASE
 * e.waitUntil Used: cache.open and cache.addAll are async. SW could terminate before these are completed.
 * On cache.open, we add all assets to cache with cache.addAll
 */
self.addEventListener('install', function(e) {
	console.log('[SW] Install');
	e.waitUntil(
		caches.open(cacheName).then(function(cache) {
			console.log('[SW] Caching App Shell');
			return cache.addAll(filesToCache);
		})
	);
});

/**
 * ACTIVATE PHASE
 * caches.keys is async, hence e.waitUntill used
 * Check for cache names that are not the equal to current cache in use, and delete them.
 */
self.addEventListener('activate', function(e) {
	console.log('[SW] Activate');
	e.waitUntil(
		caches.keys().then(function(keyList) {
			return Promise.all(
				keyList.map(function(key) {
					if (key != cacheName) {
						console.log('[SW] Removing old cache', key);
						return caches.delete(key);
					}
				})
			);
		})
	);
});

/**
 * FETCH EVENT
 * If asset is already cahced, return that, else make a request to fetch that asset.
 * Strategy: If request is made to get asset, the response needs to be added to cache.
 * This strategy is for frequent updating content, like feeds.
 */
self.addEventListener('fetch', function(e) {
	console.log('[SW] Fetch', e.request.url);
	e.respondWith(
		caches.match(e.request).then(function(response) {
			return (
				response ||
				fetch(e.request).then(function(response) {
					cache.put(e.request, response.clone());
					return response;
				})
			);
		})
	);
});
