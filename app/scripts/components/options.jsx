var OptionCheckbox = React.createClass({
	render: function() {
		return (
				<label htmlFor={"option-" + this.props.uuidForSet + "-" + this.props.value} className="pure-checkbox">
					<input id={"option-" + this.props.uuidForSet + "-" + this.props.value} type="checkbox" name={this.props.uuidForSet} value={this.props.value} /> {this.props.value}
				</label>
			);
	}
});

var OptionRadio = React.createClass({
	render: function() {
		return (
				<label htmlFor={"option-" + this.props.uuidForSet + "-" + this.props.value} className="pure-radio">
					<input id={"option-" + this.props.uuidForSet + "-" + this.props.value} type="radio" name={this.props.uuidForSet} value={this.props.value} /> {this.props.value}
				</label>
			);
	}
});

var OptionList = React.createClass({
	render: function() {
		var radios, checkboxes,
			uuidForSet = this.props.options.uuid;

		//we default to Radio Buttons, since we can always expect at least 1 option to be selected.
		if (this.props.options.acceptsMultipleOptions) {
			checkboxes = this.props.options.values.map(function(option) {
				return <OptionCheckbox key={option.key} value={option.value} uuidForSet={uuidForSet} />
			});
		} else {
			radios = this.props.options.values.map(function(option) {
				return <OptionRadio key={option.key} value={option.value} uuidForSet={uuidForSet} />
			});
		}
		
		return (
				<form className="pure-form">{radios || checkboxes}</form>
			);
	}
});