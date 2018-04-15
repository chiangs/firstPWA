// when sw is installed
// self.addEventListener('install', function(event) {
// 	console.log('[Service Worker] Installing service worker ...', event);
// });
self.addEventListener(`install`, event =>
	console.log('[Service Worker] Installing service worker ...', event)
);

// when sw installed AND activated
// all running tabs of this web app must be closed in order for this to register
// this is to not interrupt and break current communication with old version of SW
self.addEventListener(`activate`, event => {
	console.log(`[Service Worker] Activating service worker ...`, event);
	return self.clients.claim();
});

// fetch happens when something is loaded like image/css/scripts when we send manual fetch request
self.addEventListener(`fetch`, event => {
	console.log(`[Service Worker] Fetching something ...`, event);
	event.respondWith(fetch(event.request));
	// currently only send the request data, but this is where you can decide what to do based on connection status
});
