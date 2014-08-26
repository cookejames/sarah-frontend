(function(){
'use strict';

angular.module('sarahApp', [
	'sensorReading',
	'sarahApp.filters',
	'sarahApp.directives',
	'rickshawGraph',
	'angular-loading-bar'
]).config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider){
	cfpLoadingBarProvider.latencyThreshold = 100;
}]);
angular.module('sarahApp.filters', []);
angular.module('sarahApp.directives', []);
angular
	.module('sensorReading', ['restangular'])
	.config(['RestangularProvider', function(RestangularProvider){
		RestangularProvider.setBaseUrl('http://api.sarah.local');
		RestangularProvider.setDefaultHttpFields({cache: true});
		// add a response intereceptor
		RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
			var extractedData;
			// .. to look for getList operations
			if (operation === "getList") {
				// .. and handle the data and meta data
				extractedData = data._embedded[what];
				extractedData.meta = {
					_links: data._links,
					page_count: data.page_count,
					page_size: data.page_size,
					total_items: data.total_items
				};
			} else {
				extractedData = data._embedded;
			}
			return extractedData;
		});
	}]);
})();