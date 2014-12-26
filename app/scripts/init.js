/* Stop console.log errors */
if (typeof console === 'undefined') {
	window.console = {};
	console.log = console.error = console.info = console.debug = console.warn = console.trace = console.dir = console.dirxml = console.group = console.groupEnd = console.time = console.timeEnd = console.assert = console.profile = function() {};
}

(function(NAMESPACE) {

	'use strict';

	NAMESPACE.init = function() {
		var questions = [];

		Parse.initialize(NAMESPACE.credentials.parse.appId, NAMESPACE.credentials.parse.jsKey);

		var Question = Parse.Object.extend("Question");
		var query = new Parse.Query(Question);
		query.equalTo("available", true);
		query.find({
			success: function(results) {
				for (var i=0; i < results.length; i++) {
					var values = [],
						question = results[i];
					var options = question.get('options');

					for (var j=0; j < options.length; j++) {
						values.push({value:options[j], key:j});
					}

					questions.push({
						key: results[i].id,
						title: results[i].get('title'),
						options: {
							uuid: results[i].id,
							acceptsMultipleOptions: results[i].get('acceptsMultipleOptions'),
							values: values
						}
					})
				}

				React.render(
					React.createElement(QuestionList, {questions: questions}),
					document.getElementById('questions')
				);
			},
			error: function(error) {
				console.error("Error: " + error.code + " " + error.message);
			}
		});
	};

	$(document).ready(function() {
		NAMESPACE.init();
	});

}(APIDAYS));