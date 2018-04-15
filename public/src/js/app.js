// Check if the serviceworker feature is available in the client browser
if ('serviceWorker' in navigator) {
	// navigator.serviceWorker.register('/sw.js', {scope: '/help'}).then(function() {  spec scope via js object as 2d arg in register
	navigator.serviceWorker.register('/sw.js').then(function() {
		console.log('Service worker registered!');
	});
}
