var OptionCheckbox = React.createClass({
	render: function() {
		return (
				<label htmlFor={"option-" + this.props.questionId + "-" + this.props.value} className="pure-checkbox">
					<input id={"option-" + this.props.questionId + "-" + this.props.value} type="checkbox" name={this.props.questionId} value={this.props.value} /> {this.props.text}
				</label>
			);
	}
});

var OptionRadio = React.createClass({
	render: function() {
		return (
				<label htmlFor={"option-" + this.props.questionId + "-" + this.props.value} className="pure-radio">
					<input id={"option-" + this.props.questionId + "-" + this.props.value} type="radio" name={this.props.questionId} value={this.props.value} /> {this.props.text}
				</label>
			);
	}
});

var OptionList = React.createClass({
	render: function() {
		var radios, checkboxes,
			questionId = this.props.options.questionId;

		//we default to Radio Buttons, since we can always expect at least 1 option to be selected.
		if (this.props.options.acceptsMultipleOptions) {
			checkboxes = this.props.options.values.map(function(option) {
				return <OptionCheckbox key={option.key} text={option.text} value={option.optionId} questionId={questionId} />
			});
		} else {
			radios = this.props.options.values.map(function(option) {
				return <OptionRadio key={option.key} text={option.text} value={option.optionId} questionId={questionId} />
			});
		}
		
		return (
				<div>{radios || checkboxes}</div>
			);
	}
});