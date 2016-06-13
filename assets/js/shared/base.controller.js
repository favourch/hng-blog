(function () {
	'use strict';
	var BaseController;

	BaseController = function ($scope) {
		$scope.title = 'Developer Blog';
	};

	// Injecting dependencies...
	BaseController.$inject = ['$scope'];

	// Registering controller...
	angular
		.module('HNGBlog.shared')
		.controller('BaseController', BaseController);
}());
