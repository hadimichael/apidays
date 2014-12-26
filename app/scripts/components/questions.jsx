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
	getInitialState: function() {
		var questions = this.props.questions.map(function(question) {
			return <Question key={question.key} title={question.title} options={question.options} />
		});
		return {questions: questions, sessionId: this.props.sessionId};
	},
	clearQuestionsByList: function(list) {
		var questions = this.state.questions;

		for (var i=0; i<list.length; i++) {
			questions = questions.filter(function(el) {
				return (el.key != list[i].get('question').id)
			});
		}

		this.setState({questions: questions});
	},
	handleSubmit: function(e) {
		e.preventDefault(); //manually submit the form to Parse

		var self = this;

		var Session = Parse.Object.extend("Session"),
			session = new Session();
			session.id = this.props.sessionId;

		var objectsForBatchSave = [],
			data = $("#survey-form").serializeArray(),
			Question = Parse.Object.extend("Question"),
			OptionObj = Parse.Object.extend("Option"),
			Result = Parse.Object.extend("Result");

		for (var i = 0; i < data.length; i++) {
			var question = new Question();
			question.id = data[i].name;
			question.addUnique('sessions', session);

			var optionObj = new OptionObj();
			optionObj.id = data[i].value

			var result = new Result();
			result.set('question', question);
			result.set('answer', optionObj);
			result.set('session', session);

			objectsForBatchSave.push(result);
		}

		Parse.Object.saveAll(objectsForBatchSave, {
			success: function(list) {
				console.log('Saved answers', list);
				self.clearQuestionsByList(list);
			},
			error: function(error) {
				console.log('Error', error);
			},
		});
	},
	render: function() {
		if (this.state.questions.length > 0) {
			return (
				<form id="survey-form" onSubmit={this.handleSubmit} className="pure-form">
					<div>{this.state.questions}</div>
					<input type="submit" value="Submit" className="pure-button pure-button-primary" />
				</form>
			);
		}
		
		return (<p>There are no more questions for you at the moment. Please try again shortly.</p>)
	}
});