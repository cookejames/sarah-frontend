'use strict';

describe('Sensors component', function() {
    describe('SensorsController', function(){
        var ctrl;

        beforeEach(function(){
            angular.module('sarahApp.sensors');
        });
        beforeEach(inject(function($controller) {
            var sensorsService = {
                getNodes: function(){
                    return {$object: []};
                }
            };
            ctrl = $controller(SensorsController, {SensorsService: sensorsService});
        }));

        it('Should have a service and nodes', function() {
            expect(ctrl.SensorsService).toBeDefined();
            expect(ctrl.nodes).toBeDefined();
        });
    });
});
