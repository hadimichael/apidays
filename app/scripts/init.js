/* Stop console.log errors */
if (typeof console === 'undefined') {
	window.console = {};
	console.log = console.error = console.info = console.debug = console.warn = console.trace = console.dir = console.dirxml = console.group = console.groupEnd = console.time = console.timeEnd = console.assert = console.profile = function() {};
}

(function(NAMESPACE) {

	'use strict';

	NAMESPACE.init = function() {
		Parse.initialize(NAMESPACE.credentials.parse.appId, NAMESPACE.credentials.parse.jsKey);

		if (!Cookies.enabled) { $('#questions').html('<p>You must have cookies enabled.</p>'); return; }

		//organise sessions
		var sessionId = Cookies.get(NAMESPACE.credentials.cookieKey);

		if (sessionId) {
			NAMESPACE.questions.init(sessionId);
		} else {
			var Session = Parse.Object.extend('Session'),
				session = new Session();
			
			//get the user IP to store
			$.getJSON("http://api.ipify.org?format=jsonp&callback=?",
				function(response) {
					session.set('ip', response.ip);

					session.save().then(function(obj) {
						Cookies.set(NAMESPACE.credentials.cookieKey, obj.id, {expires: new Date(2015, 0, 1)});
						NAMESPACE.questions.init(obj.id);
					}, function(error) {
						console.error('Could not create session');
					});
				}
			);
		}

	};

	$(document).ready(function() {
		NAMESPACE.init();
	});

}(APIDAYS));