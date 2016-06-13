(function () {
	'use strict';
	var PostsController;

	PostsController = function ($scope) {
		$scope.posts = false;
	};

	PostsController.$inject = ['$scope'];

	angular.module('HNGBlog.posts').controller('PostsController', PostsController);

}());