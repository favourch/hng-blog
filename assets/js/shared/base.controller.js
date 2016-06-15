(function () {
	'use strict';
	var BaseController;

	/**
	 * Mother of all controllers.
	 *
	 * @param  {Object} $scope
	 * @return {void}
	 */
	BaseController = ['$scope', function ($scope) {
		$scope.title = 'Developer Blog - HNG.tech';
		$scope.headerImage = '/assets/img/header.jpg';
	}];

	// Register...
	angular.module('HNGBlog.shared').controller('BaseController', BaseController);
}());
