// declare defferedPromp variable to change when `Add to Homescreen is shown`.
let deferredPrompt;

// Promise polyfill use for older browser use
!window.Promise ? (window.Promise = Promise) : !window.Promise;

// Check if the serviceworker feature is available in the client browser
if ('serviceWorker' in navigator) {
	// navigator.serviceWorker.register('/sw.js', {scope: '/help'}).then(function() {  // specific scope via js object as 2d arg in register
	// register returns a promise
	navigator.serviceWorker
		.register('/sw.js')
		.then(function() {
			console.log('Service worker registered!');
		})
		.catch(err => console.log(err));
}

// Change the default timing of when `Add to Homescreen` is shown, if desired
/* Prevent default behavior when event is fired
assign the event and return false to do nothing when it happens
*/
window.addEventListener('beforeinstallprompt', event => {
	console.log('prevented install prompt.');
	event.preventDefault();
	deferredPrompt = event;
	return false;
});
