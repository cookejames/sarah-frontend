angular.module('sarahApp.directives').directive('fuzzyTime', function() {
	'use strict';
	return {
		restrict: 'AE',
		scope: {
			timestamp: '=timestamp'
		},
		link: function(scope, element, attrs) {
			/**
			 * Return the time as a string like "a minute ago"
			 * @param phpTimestamp
			 * @returns {string}
			 */
			var formatTime = function(phpTimestamp) {
				//get difference in seconds
				var seconds = parseInt(Date.now()/1000) - phpTimestamp;
				var minutes = parseInt(seconds / 60);
				var hours = parseInt(minutes / 60);
				var days = parseInt(hours / 24);

				if (phpTimestamp === false || phpTimestamp === undefined) {
					return '--';
				} else if (minutes === 0) {
					return 'less than a minute';
				} else if (seconds === 60) {
					return 'a minute ago';
				} else if (hours === 0) {
					return minutes + ' minutes ago';
				} else if (minutes === 60) {
					return 'an hour ago';
				} else if (days === 0) {
					return hours + ' hours ago';
				} else if (days === 1) {
					return 'a day ago';
				} else {
					return days + ' days ago';
				}
			};

			function display() {
				element.text(formatTime(scope.timestamp));
			}

			scope.$watch('timestamp', function(newValue, oldValue) {
				if (!angular.equals(newValue, oldValue)) {
					display();
				}
			});

			display();
		}
	};
});