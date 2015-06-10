angular.module('heating').service('heatingService', ['$q', 'Restangular', function ($q, Restangular) {
	'use strict';
	var baseGroups = Restangular.all('group');
	var baseSchedules = Restangular.all('schedule');

	var groups = {};

	var service = {

	};

	return service;
}]);