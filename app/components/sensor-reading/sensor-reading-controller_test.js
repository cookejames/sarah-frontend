describe('Controller: sensorReadingController', function(){
	var controller;

	beforeEach(module('sarahApp'));

	beforeEach(inject(function($controller){
		controller = $controller('sensorReadingController', { $scope: {} });
	}));

	it('should be defined', inject(function($controller) {
		expect(controller).toBeDefined();
	}));

	it('should have sensors', inject(function($controller){
		expect(controller.sensors).toBeArrayOfObjects();
	}));
});