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
		RestangularProvider.setBaseUrl('/api');
		RestangularProvider.setDefaultHttpFields({cache: true});
		// add a response intereceptor
		RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
			var extractedData;
			// .. to look for getList operations
			if (operation === "getList") {
				// .. and handle the data and meta data
				extractedData = data._embeded;
				//extractedData.meta = data.data.meta;
			} else {
				extractedData = data._embeded;
			}
			return extractedData;
		});
	}]);
})()