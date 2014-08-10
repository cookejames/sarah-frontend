angular.module('sensorReading').service('sensorReadingService', ['$q', 'Restangular', function ($q, Restangular) {
	'use strict';
	var sensorReadingService = this;
	var baseNodes = Restangular.all('getnodes');
	var baseSensors = Restangular.all('getsensors');
	var baseSensorValues = Restangular.all('getsensorvalues');

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

			//hard coded for now
			var from = parseInt(Date.now()/1000) - 60*60*24;
			var to = parseInt(Date.now()/1000);
			baseSensorValues.getList({node: node, from: from, to: to}).
				then(function(sensorValues) {
					var sensorMap = {};
					var length = sensorValues.length;
					for (var i = 0; i < length; i++) {
						var sensorValue = sensorValues[i];
						if (nodes[node].sensors[sensorValue.sensor] !== undefined) {
							nodes[node].sensors[sensorValue.sensor].values[sensorValue.id] = sensorValue.plain();
							nodes[node].sensors[sensorValue.sensor].latest = sensorValue.plain();
						}

						deferred.resolve(nodes);
					}
				});

			return deferred.promise;
		}
	};

	return service;
}]);