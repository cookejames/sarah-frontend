describe('Controller: sensorReadingController', function(){
	var controller;

	beforeEach(module('sensorReading'));

	beforeEach(inject(function($rootScope, $controller, $interval, $q){
		//mock the sensor reading service
		var returnPromise = function() {
			var deferred = $q.defer();
			deferred.resolve({});
			return deferred.promise;
		};

		var sensorReadingServiceMock = {
			getNodes: function(){return {}},
			updateNodes: returnPromise,
			updateSensors: returnPromise,
			updateSensorValues: returnPromise
		};

		controller = $controller('sensorReadingController', {
			$scope: $rootScope.$new(),
			$interval: $interval,
			sensorReadingService: sensorReadingServiceMock
		});
	}));

	it('should be defined', inject(function() {
		expect(controller).toBeDefined();
	}));

	it('should be able to set node active', inject(function(){
		expect(controller.isActive(1)).toBeFalse();
		controller.setActive(1);
		expect(controller.isActive(1)).toBeTrue();
	}));
});