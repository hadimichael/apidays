var Results = React.createClass({
	render: function() {
		var questions = this.props.questions.map(function(question) {
			return <li key={question.key}><a href={"#/results/" + question.key}>{question.title}</a></li>
		});

		return (
				<div className="results">
					<h1 className="content-subhead">Results</h1>
					<ul>{questions}</ul>
				</div>
			);
	}
});