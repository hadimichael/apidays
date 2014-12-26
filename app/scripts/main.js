var q1options = {
	uuid: 'q1',
	checkboxes: [
		{value:'API Documentation', id:'1'},
		{value:'Terms of Use', id:'2'},
		{value:'Blogs', id:'3'},
		{value:'Forums', id:'4'},
		{value:'Create/manage apps and API keys', id:'5'}
	]
};

var q2options = {
	uuid: 'q2',
	radios: [
		{value:'True', id:'1'},
		{value:'False', id:'2'}
	]
};

React.render(
	React.createElement(Question, {title: "What are developer portals good for?", options: q1options}),
	// <Question title='Does an API Portal need to be branded?' options={q2options} />,
	document.getElementById('questions')
);