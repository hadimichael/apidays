var Result = React.createClass({
	render: function() {
		// var series = [{
		// 	type: 'column',
		// 	name: 'Browser share',
		// 	data: [
		// 		['Firefox',   45.0],
		// 		['IE',       26.8],
		// 		{
		// 			name: 'Chrome',
		// 			y: 12.8,
		// 			sliced: true,
		// 			selected: true
		// 		},
		// 		['Safari',    8.5],
		// 		['Opera',     6.2],
		// 		['Others',   0.7]
		// 	]
		// }];

		return (
				<div className="results">
					<h1 className="content-subhead">Results</h1>
					<Chart categories={this.props.categories} series={this.props.series} id={this.props.id} />
				</div>
			);
	}
});