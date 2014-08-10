'use strict';

describe('Filter: partition', function(){
	beforeEach(module('sarahApp'));

	it('should split an array into parts', inject(function(partitionFilter) {
		var array = [];
		for (var i = 0; i < 7; i++) {
			array.push(Math.random());
		}

		var newArray = partitionFilter(array, 3);
		expect(newArray).toBeArray();
		expect(newArray.length).toBe(3);
		expect(newArray[0].length).toBe(3);
		expect(newArray[1].length).toBe(3);
		expect(newArray[2].length).toBe(1);
	}));
});