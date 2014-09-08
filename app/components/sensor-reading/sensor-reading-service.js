angular.module('sensorReading').service('sensorReadingService', ['$q', 'Restangular', function ($q, Restangular) {
	'use strict';
	var baseNodes = Restangular.all('node');
	var baseSensors = Restangular.all('sensor');
	var baseSensorValues = Restangular.all('sensor-value');

	var nodes = {};

	var service = {
		/**
		 * Get our nodes
		 * @returns {{}}
		 */
		getNodes: function() {
			return nodes;
		},

		/**
		 * Update the available nodes from the server
		 * @returns {*}
		 */
		updateNodes: function() {
			var deferred = $q.defer();

			baseNodes.getList().then(function(fetchedNodes) {
				angular.forEach(fetchedNodes, function(node){
					if (nodes[node.id] === undefined) {
						nodes[node.id] = node.plain();
						//add a sensors object
						nodes[node.id].sensors = {};
					}
				});

				deferred.resolve(nodes);
			});

			return deferred.promise;
		},

		/**
		 * Update the available sensors from the server
		 * @returns {*}
		 */
		updateSensors: function() {
			var deferred = $q.defer();

			baseSensors.getList().then(function(sensors) {
				angular.forEach(sensors, function(sensor){
					if (nodes[sensor.node] !== undefined && nodes[sensor.node].sensors[sensor.id] === undefined) {
						nodes[sensor.node].sensors[sensor.id] = sensor.plain();
						nodes[sensor.node].sensors[sensor.id].values = {};
					}
				});
				deferred.resolve(nodes);
			});

			return deferred.promise;
		},

		/**
		 * Update the sensor values from the server
		 * @param node the node to get the values for
		 * @returns {*}
		 */
		updateSensorValues: function(node) {
			var deferred = $q.defer();

			if (!nodes[node]) {return deferred.reject('Node does not exist')}
			var sensors = Object.keys(nodes[node].sensors);
			baseSensorValues.getList({'sensors[]': sensors}).
				then(function(sensorValues) {
					var length = sensorValues.length;
					for (var i = 0; i < length; i++) {
						var sensorValue = sensorValues[i];
						if (nodes[node].sensors[sensorValue.sensor] !== undefined) {
							var sensor = nodes[node].sensors[sensorValue.sensor];
							if (sensor.conversionFactor) {
								sensorValue.value *= sensor.conversionFactor;
							}
							sensor.values[sensorValue.id] = sensorValue.plain();
							if (sensor.latest === undefined || sensor.latest.date < sensorValue.date) {
								sensor.latest = sensorValue.plain();
							}
						}

						deferred.resolve(nodes);
					}
				});

			return deferred.promise;
		}
	};

	return service;
}]);