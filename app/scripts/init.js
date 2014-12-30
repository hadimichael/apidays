/* Stop console.log errors */
if (typeof console === 'undefined') {
	window.console = {};
	console.log = console.error = console.info = console.debug = console.warn = console.trace = console.dir = console.dirxml = console.group = console.groupEnd = console.time = console.timeEnd = console.assert = console.profile = function() {};
}

(function(NAMESPACE) {

	'use strict';

	NAMESPACE.init = function() {
		Parse.initialize(NAMESPACE.credentials.parse.appId, NAMESPACE.credentials.parse.jsKey);

		/* setup crossroads - routing */

		// root directory: check sessions and load the questions
		crossroads.addRoute('/', function() {
			if (!Cookies.enabled) { $('#content').html('<p>You must have cookies enabled.</p>'); return; }

			//organise sessions
			var sessionId = Cookies.get(NAMESPACE.credentials.cookieKey);

			if (sessionId) {
				NAMESPACE.questions.init(sessionId);
			} else {
				var Session = Parse.Object.extend('Session'),
					session = new Session();
				
				//get the user IP to store
				$.getJSON('http://api.ipify.org?format=json',
					function(response) {
						session.set('ip', response.ip);

						session.save().then(function(obj) {
							Cookies.set(NAMESPACE.credentials.cookieKey, obj.id, {expires: new Date(2015, 0, 1)});
							NAMESPACE.questions.init(obj.id);
						}, function(error) {
							console.error('Could not create session', error);
						});
					}
				);
			}
		});

		//results
		crossroads.addRoute('/results', function() {
			console.log('Results page');
		});

		crossroads.routed.add(console.log, console); //log all routes
		
		/* setup hasher - browser url hashes */
		function parseHash(newHash, oldHash){
			crossroads.parse(newHash);
		}
		hasher.initialized.add(parseHash); //parse initial hash
		hasher.changed.add(parseHash); //parse hash changes
		hasher.init(); //start listening for history change
	};

	$(document).ready(function() {
		NAMESPACE.init();
	});

}(APIDAYS));