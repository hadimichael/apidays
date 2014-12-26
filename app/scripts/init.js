/* Stop console.log errors */
if (typeof console === 'undefined') {
	window.console = {};
	console.log = console.error = console.info = console.debug = console.warn = console.trace = console.dir = console.dirxml = console.group = console.groupEnd = console.time = console.timeEnd = console.assert = console.profile = function() {};
}

(function(NAMESPACE) {

	'use strict';

	NAMESPACE.init = function() {
		var questionList = [];

		Parse.initialize(NAMESPACE.credentials.parse.appId, NAMESPACE.credentials.parse.jsKey);

		var Question = Parse.Object.extend('Question');

		var query = new Parse.Query(Question);
		query.equalTo('available', true);
		query.include('options');
		query.find({
			success: function(questions) {
				for (var i=0; i < questions.length; i++) {
					var values = [],
						question = questions[i];
					var options = question.get('options');

					for (var j=0; j < options.length; j++) {
						var option = options[j],
							text = option.get('text');

						values.push({text:text, optionId:options[j].id, key:options[j].id});
					}

					questionList.push({
						key: questions[i].id,
						title: questions[i].get('title'),
						options: {
							questionId: questions[i].id,
							acceptsMultipleOptions: questions[i].get('acceptsMultipleOptions'),
							values: values
						}
					});
				}

				React.render(
					React.createElement(QuestionList, {questions: questionList}),
					document.getElementById('questions')
				);
			},
			error: function(error) {
				console.error('Error: ' + error.code + ' ' + error.message);
			}
		});
	};

	$(document).ready(function() {
		NAMESPACE.init();
	});

}(APIDAYS));