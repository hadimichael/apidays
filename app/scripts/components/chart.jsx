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
					var total = this.point.total ? this.point.total : series.data.map(function(point) { return isNaN(point[1]) ? 0 : point[1] }).reduce( function(sum, num){ return sum + num }, 0)
					var percentage = this.point.percentage ? this.point.percentage : this.point.y*100/total;
					return '<b>' + this.point.name + '</b><br />Responses: ' + this.point.y + ' (' + Math.round(percentage*10)/10 + '%)<br/>Total: ' + total;
				}
			},
			xAxis: {
				type: 'category'
			},
			yAxis: {
				min: 0,
				title: {
					text: 'Number of responses'
				},
			},
			legend: {
				itemStyle: {
					width: 200
				},
				labelFormat: '{percentage:.1f}%: {name}'
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: false,
						format: '<b>{point.name}</b>: {point.percentage:.1f}%',
						style: {
							color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
						}
					}
				},
				column: {
					cursor: 'pointer'
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