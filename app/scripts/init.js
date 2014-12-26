/* Stop console.log errors */
if (typeof console === 'undefined') {
	window.console = {};
	console.log = console.error = console.info = console.debug = console.warn = console.trace = console.dir = console.dirxml = console.group = console.groupEnd = console.time = console.timeEnd = console.assert = console.profile = function() {};
}

(function(NAMESPACE) {

	'use strict';

	NAMESPACE.init = function() {
		var question1 = {
			key: 'q1',
			title: 'What are developer portals good for?',
			options: {
				uuid: 'q1',
				checkboxes: [
					{value:'API Documentation', key:'1'},
					{value:'Terms of Use', key:'2'},
					{value:'Blogs', key:'3'},
					{value:'Forums', key:'4'},
					{value:'Create/manage apps and API keys', key:'5'}
				]
			}
			
		};

		var question2 = {
			key: 'q2',
			title: 'Does an API Portal need to be branded?',
			options: {
				uuid: 'q2',
				radios: [
					{value:'Yes', key:'1'},
					{value:'No', key:'2'}
				]
			}
			
		};

		React.render(
			React.createElement(QuestionList, {questions: [question1, question2]}),
			document.getElementById('questions')
		);
	};

	$(document).ready(function() {
		NAMESPACE.init();
	});

}(APIDAYS));