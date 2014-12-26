var Question = React.createClass({
	render: function() {
		return (
				<section className="question">
					<header className="question-header">
							<h2 className="question-title">{this.props.title}</h2>
					</header>

					<div className="question-options">
						<OptionList options={this.props.options} />
					</div>
				</section>
			);
	}
});

var QuestionList = React.createClass({
	render: function() {
		var questions = this.props.questions.map(function(question) {
			return <Question key={question.key} title={question.title} options={question.options} />
		});
		
		return (
				<div>{questions}</div>
			);
	}
});