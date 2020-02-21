if ('serviceWorker' in navigator) {
	window.addEventListener('load', function() {
		navigator.serviceWorker
			.register('/sw.js', {
				scope: './'
			})
			.then(function(registration) {
				console.info('[SW] Registration successful with scope: ' + registration.scope);
			}, function(err) {
				console.info('[SW] Registration failed: ' + err);
			});
	});
}