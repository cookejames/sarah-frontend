'use strict';

describe('Filter: roundedNumber', function(){
	beforeEach(module('sarahApp'));

	it('number with no exponent should be unchanged', inject(function(roundedNumberFilter) {
		var number = 999;
		var rounded = roundedNumberFilter(number, 2);
		expect(rounded).toEqual(number);
	}));

	it('number with exponent should be rounded', inject(function(roundedNumberFilter) {
		var number = 55.49999;
		var rounded = roundedNumberFilter(number, 2);
		expect(rounded).toEqual('55.50');
	}));
});