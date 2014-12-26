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
		uukey: 'q2',
		radios: [
			{value:'True', key:'1'},
			{value:'False', key:'2'}
		]
	}
	
};

React.render(
	React.createElement(QuestionList, {questions: [question1, question2]}),
	document.getElementById('questions')
);