var PieChart = React.createClass({
	getInitialState: function() {
		return {series: this.props.series, id: this.props.id};
	},
	componentDidMount: function() {
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
				text: 'Browser market shares at a specific website, 2014'
			},
			tooltip: {
				pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: true,
						format: '<b>{point.name}</b>: {point.percentage:.1f} %',
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
				<div className="chart" id={this.state.id}></div>
			);
	}
});