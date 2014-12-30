var PieChart = React.createClass({
	componentDidMount: function() {
		$('#chart').highcharts({
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
			series: [{
				type: 'pie',
				name: 'Browser share',
				data: [
					['Firefox',   45.0],
					['IE',       26.8],
					{
						name: 'Chrome',
						y: 12.8,
						sliced: true,
						selected: true
					},
					['Safari',    8.5],
					['Opera',     6.2],
					['Others',   0.7]
				]
			}]
		});
	},
	render: function() {
		var divStyle = {
			minWidth: '310px',
			height: '400px',
			maxWidth: '600px',
			margin: '0 auto'
		};

		return (
				<div id="chart" style={divStyle}></div>
			);
	}
});