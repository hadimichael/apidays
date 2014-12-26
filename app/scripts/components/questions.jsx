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