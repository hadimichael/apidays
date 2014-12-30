(function(NAMESPACE) {

	'use strict';

	NAMESPACE.results = (function() {

		var init = function() {
			React.render(
				React.createElement(Results),
				document.getElementById('content')
			);
		};

		return {
			init: init
		};
		
	}());

}(APIDAYS));