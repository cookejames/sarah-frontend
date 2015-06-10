'use strict';

describe('Heating component', function() {

    describe('HeatingController', function(){
        var ctrl;

        beforeEach(module('sarahApp.heating'));
        beforeEach(inject(function($controller) {
            ctrl = $controller('HeatingController', {});
        }));


        it('Should have a name', function() {
            expect(ctrl.name).toEqual('Heating');
        });
    });
});
