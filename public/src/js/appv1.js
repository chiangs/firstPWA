// This is app.js v1 with example fetches at the bottom

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

// Fetch and Promise API is not supported by older browsers, but required for PWA so polyfills are the answer.
// Example of chaining `.then` aka `resolve` of promises
// Here we get the response, map it to json and then pass the resulting data back to to a console log
// GET
fetch('https://www.httpbin.org/ip')
	.then(response => {
		console.log(response);
		// where response is a js object
		return response.json();
	}) // where data is the body => {origin: "92.221.49.202"}
	.then(data => console.log(data))
	.catch(err => console.log(err));

// POST
fetch('https://www.httpbin.org/post', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json' // only necessary if API specifies and sends other than json
	},
	mode: 'cors', // this is default. 'no-cors' allows you to pass along non-accessible data to display if you don't need to do anything with it.
	body: JSON.stringify({
		message: 'Does this work?'
	})
})
	.then(response => {
		console.log(response);
		// where response is a js object
		return response.json();
	}) // where data is the body => {origin: "92.221.49.202"}
	.then(data => console.log(data))
	.catch(err => console.log(err));
