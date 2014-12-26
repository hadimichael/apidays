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
	componentDidMount: function() {
		$('#survey-form').submit(function (e) {
			e.preventDefault(); //manually submit the form to Parse

			var results = [],
				data = $("#survey-form").serializeArray(),
				Question = Parse.Object.extend("Question"),
				OptionObj = Parse.Object.extend("Option"),
				Result = Parse.Object.extend("Result");

			for (var i = 0; i < data.length; i++) {
				var question = new Question();
				question.id = data[i].name;

				var optionObj = new OptionObj();
				optionObj.id = data[i].value

				var result = new Result();
				result.set("question", question);
				result.set("answerOption", optionObj);

				results.push(result);
			}

			Parse.Object.saveAll(results, {
				success: function(list) {
					console.log('Saved', list);
				},
				error: function(error) {
					console.log('Error', error);
				},
			});
		});
	},
	render: function() {
		var questions = this.props.questions.map(function(question) {
			return <Question key={question.key} title={question.title} options={question.options} />
		});
		
		return (
				<form id="survey-form" method="POST" className="pure-form">
					<div>{questions}</div>
					<input type="submit" value="Submit" className="pure-button pure-button-primary" />
				</form>
			);
	}
});