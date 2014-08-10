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

				if (phpTimestamp === false) {
					return '--';
				} else if (seconds < 60) {
					return 'less than a minute';
				} else if (seconds == 60) {
					return 'a minute ago';
				} else if (seconds < 60 * 60) {
					return minutes + ' minutes ago';
				} else if (seconds == 60 * 60) {
					return 'an hour ago';
				} else if (seconds < 60 * 60 * 24) {
					return hours + ' hours ago';
				} else {
					return 'over a day ago';
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