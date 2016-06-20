(function (CONFIG) {
	'use strict';
	var BaseController;

	/**
	 * Mother of all controllers.
	 *
	 * @param  {Object} $scope
	 * @return {void}
	 */
	BaseController = ['$scope', function ($scope) {
		$scope.CONFIG      = CONFIG;
		$scope.headerImage = CONFIG.defaultHeaderImage;
		$scope.title       = 'Developer Blog - ' + CONFIG.siteName;
	}];

	// Register...
	angular.module('HNGBlog.shared').controller('BaseController', BaseController);
}(window.hngBlogConfig));
