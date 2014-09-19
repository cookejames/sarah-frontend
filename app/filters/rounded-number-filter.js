/**
 * When a number has an exponent round it using the default number filter otherwise do not format it
 */
angular.module('sarahApp.filters').filter('roundedNumber', ['$filter', function($filter) {
	'use strict';
	var numberFilter = $filter('number');
	return function(number, fractionSize) {
		var numStr = number + '';
		if (numStr.indexOf('.') === -1) {
			return number;
		} else {
			return numberFilter(number, fractionSize);
		}
	};
}]);