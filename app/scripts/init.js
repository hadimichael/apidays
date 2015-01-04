/* Stop console.log errors */
if (typeof console === 'undefined') {
	window.console = {};
	console.log = console.error = console.info = console.debug = console.warn = console.trace = console.dir = console.dirxml = console.group = console.groupEnd = console.time = console.timeEnd = console.assert = console.profile = function() {};
}

(function(NAMESPACE) {

	'use strict';

	NAMESPACE.setupRoutes = function() {
		/* setup crossroads - routing */

		// root directory: check sessions and load the questions, sessions are used to stop people from seeing questions they've already answered
		crossroads.addRoute('/', function() {
			if (!Cookies.enabled) { $('#content').html('<p>You must have cookies enabled to use this app.</p>'); return; } //TODO: build a proper notifications UI

			//organise sessions
			var sessionId = Cookies.get(NAMESPACE.credentials.cookieKey),
				Session = Parse.Object.extend('Session'),
				createSession = function() {
					//get the user IP to store
					$.ajax({
						dataType: 'jsonp',
						url: 'https://api.ipify.org?format=jsonp&callback=?',
						success: function(response) {
							var session = new Session();
							session.set('ip', response.ip);

							session.save().then(function(obj) {
								var expires = 60 * 60 * 24 * 7 * 52; //1 year
								Cookies.set(NAMESPACE.credentials.cookieKey, obj.id, { expires: expires });
								NAMESPACE.questions.init(obj.id);
							}, function(error) {
								console.error('Could not create session', error);
							});
						}
					});
				};

			if (sessionId) {
				//we have a session, so let's validate it
				var query = new Parse.Query(Session);
				query.get(sessionId).then(function(session) {
					NAMESPACE.questions.init(session.id); //init with our valid ID
				}, function (error) {
					console.warn('Could not validate existing session. Will create a new session instead.', error);
					createSession();
				});
			} else {
				//otherwise, start a new session and get an ID
				createSession();
			}
		});

		// results: show a list of results, or the graph for a specific question
		crossroads.addRoute('/results', function() {
			NAMESPACE.results.showListOfQuestions();
		});

		crossroads.addRoute('/results/{questionId}', function(questionId) {
			NAMESPACE.results.showResultForQuestion(questionId);
		});

		// crossroads.routed.add(console.log, console); //log all routes for debugging
		
		/* setup hasher - browser url hashes */
		function parseHash(newHash) { //2nd arg is 'oldHash'
			crossroads.parse(newHash);
		}
		hasher.initialized.add(parseHash); //parse initial hash
		hasher.changed.add(parseHash); //parse hash changes
		hasher.init(); //start listening for history change
	};

	NAMESPACE.init = function() {
		$('html.lt-ie9 #content').html('<p>There\'s nothing for you to see here. This app requires a modern browser.</p>');

		Parse.initialize(NAMESPACE.credentials.parse.appId, NAMESPACE.credentials.parse.jsKey);

		NAMESPACE.setupRoutes();
	};

	$(document).ready(function() {
		NAMESPACE.init();
	});

}(APIDAYS));