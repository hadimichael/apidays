(function(NAMESPACE) {

	'use strict';

	//Enter your app credentials below and rename this file to 'credentials.js' - remember to .gitignore this file to keep your keys out of git.

	NAMESPACE.credentials = (function() {

		return {
			parse: {
				appId: 'YOUR_PARSE_APP_ID',
				jsKey: 'YOUR_PARSE_JAVASCRIPT_KEY'
			},
			cookieKey: 'apidays15-sessionId'
		}
		
	}());

}(APIDAYS));