var Results = React.createClass({
	render: function() {
		var questions = this.props.questions.map(function(question) {
			return <li key={question.key}><a href={"#/results/" + question.key}>{question.title}</a></li>
		});

		return (
				<div className="results">
					<h1 className="content-subhead">View Results</h1>
					<div className="pure-menu pure-menu-open">
						<ul>{questions}</ul>
					</div>
				</div>
			);
	}
});