angular.module('sarahApp.filters').filter('partition', function($cacheFactory) {
	'use strict';
	var arrayCache = $cacheFactory('partition');
	var filter = function(arr, size) {
		if (!arr) { return; }
		var newArr = [];
		var arrNo = -1;
		var index = 0;
		//done for compatibility with both arrays and object properties
		angular.forEach(arr, function(member){
			if (index % size === 0) {
				arrNo++;
				newArr.push([]);
			}
			newArr[arrNo].push(member);
			index++;
		});

		var cachedParts;
		var arrString = JSON.stringify(arr);
		cachedParts = arrayCache.get(arrString+size);
		if (JSON.stringify(cachedParts) === JSON.stringify(newArr)) {
			return cachedParts;
		}
		arrayCache.put(arrString+size, newArr);
		return newArr;
	};
	return filter;
});