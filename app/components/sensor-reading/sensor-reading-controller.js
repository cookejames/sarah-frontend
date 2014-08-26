angular.module('sensorReading').controller('sensorReadingController', ['$scope', '$interval', 'sensorReadingService',
function ($scope, $interval, sensorReadingService) {
	'use strict';
	var sensorReadingController = this;

	var updateInterval = 60 * 1000; //how often to fetch the sensor values for the active node - every minute
	var activeNode = null;
	//get a reference to the nodes object
	$scope.nodes = sensorReadingService.getNodes();

	//fetch nodes from the server then fetch the sensors
	sensorReadingService.updateNodes().then(function(nodes){
		return sensorReadingService.updateSensors();
	}).then(function(nodes){
		//get the first node and set it as active
		for (var node in nodes) {
			sensorReadingController.setActive(node);
			break;
		}
	});

	/**
	 * Get the latest value of a sensor as a percentage of its range
	 * @param sensor
	 * @returns {number}
	 */
	this.percentageValue = function(sensor) {
		if (sensor.latest !== undefined) {
			return sensor.latest.value / (sensor.rangeMax - sensor.rangeMin) * 100;
		}

		return 0;
	};

	//Update the active node regularly
	var interval = $interval(function(){
		if (activeNode !== null) {
			sensorReadingService.updateSensorValues(activeNode);
		}
	}, updateInterval);
	$scope.$on('$destroy', function() {
		$interval.cancel(interval);
	});

	/**
	 * Is this node active
	 * @param node
	 * @returns {boolean}
	 */
	this.isActive = function(node) {
		return node == activeNode;
	};

	/**
	 * Set this as the active node
	 * @param node
	 */
	this.setActive = function(node) {
		activeNode = node;
		sensorReadingService.updateSensorValues(node);
	};
}]);
