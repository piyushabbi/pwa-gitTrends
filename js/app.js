// Register service worker
(function() {
	// Check for service worker
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('/service-worker.js').then(function() {
			console.log('Service Worker registered.');
		});
	}
})();
