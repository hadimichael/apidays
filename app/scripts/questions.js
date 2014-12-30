(function(NAMESPACE) {

	'use strict';

	NAMESPACE.questions = (function() {

		var init = function(sessionId) {
			var Question = Parse.Object.extend('Question');
			var query = new Parse.Query(Question);
			query.equalTo('available', true);
			query.notEqualTo('sessions', {
				__type: 'Pointer',
				className: 'Session',
				objectId: sessionId
			});
			query.include('options');
			query.find({
				success: function(questions) {
					var questionList = [];
					
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

					/* global QuestionList */
					React.render(
						React.createElement(QuestionList, {questions: questionList, sessionId: sessionId}),
						document.getElementById('content')
					);
				},
				error: function(error) {
					console.error('Error: ' + error.code + ' ' + error.message);
				}
			});

		};

		return {
			init: init
		};
		
	}());

}(APIDAYS));