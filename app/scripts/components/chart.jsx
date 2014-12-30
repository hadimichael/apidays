var Chart = React.createClass({
	getInitialState: function() {
		return {title: this.props.title, categories: this.props.categories, series: this.props.series, id: this.props.id};
	},
	componentDidMount: function() {
		var series = this.state.series[0];

		$('#'+this.state.id).highcharts({
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
				backgroundColor: 'transparent'
			},
			exporting: {
				enabled: false
			},
			title: {
				text: ''
			},
			tooltip: {
				formatter: function() { 
					var total = this.point.total ? this.point.total : series.data.reduce( function(sum, num){ return sum + num }, 0)
					return '<b>Responses: ' + this.point.y + '</b><br/>Total: ' + total;
				}
			},
			xAxis: {
				categories: this.state.categories
			},
			yAxis: {
				min: 0,
				title: {
					text: 'Number of responses'
				},
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: true,
						format: '<b>{point.name}</b>: {point.percentage:.1f}%',
						style: {
							color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
						}
					}
				}
			},
			series: this.state.series
		});
	},
	render: function() {
		return (
				<div className="results">
					<h1 className="content-subhead">{this.state.title}</h1>
					<div className="chart" id={this.state.id}></div>
				</div>
			);
	}
});