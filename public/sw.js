// when sw is installed
// self.addEventListener('install', function(event) {
// 	console.log('[Service Worker] Installing service worker ...', event);
// });
self.addEventListener('install', event => {
	console.log('[Service Worker] Installing service worker ...', event);
	// script will run through everything and may reach fetch before caches.open() finishes running
	// use event.waitUntil to ensure the caches open API call to create a sub-cache is completed before proceeding
	// caches.open('name the cache')
	event.waitUntil(
		caches.open('static').then(cache => {
			// cache.add() takes in a url of the item you want to store
			// if local file like the app.js, you send the path to the file
			console.log('[Service Worker] Pre-caching App-shell');
			// cache.add('/src/js/app.js'); // this is how you would add individual
			// don't store the polyfills because it's only for browsers that don't support sw's anyway so make a workflow that conditionally loads
			// otherwise even for new browser they are loaded because of they are imported so cache them helps performance
			cache.addAll([
				'/',
				'/index.html',
				'/src/js/app.js',
				'/src/js/feed.js',
				'/src/js/promise.js',
				'/src/js/fetch.js',
				'/src/js/material.min.js',
				'/src/css/app.css',
				'/src/css/feed.css',
				'/src/images/main-images.jpg',
				'https://fonts.googleapis.com/css?family=Roboto:400,700',
				'https://fonts.googleapis.com/icon?family=Material+Icons',
				'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'
			]); // takes in an array of string
		})
	);
});

// when sw installed AND activated
// all running tabs of this web app must be closed in order for this to register
// this is to not interrupt and break current communication with old version of SW
self.addEventListener('activate', event => {
	console.log('[Service Worker] Activating service worker ...', event);
	return self.clients.claim();
});

// fetch happens when something is loaded like image/css/scripts when we send manual fetch request
// can listen for all fetch methods
self.addEventListener('fetch', event => {
	// console.log('[Service Worker] Fetching something ...', event);
	// Looks for a request in cache and provides, if not in cache, then continue getting from network
	event.respondWith(
		caches.match(event.request).then(response => {
			return response ? response : fetch(event.request);
		})
	);
});
