(function () {
	'use strict';
	var PostController, PostsController;

	PostsController = function ($scope, Posts) {
		$scope.posts = false;

		Posts.getAllPosts().then( function (data) {
			$scope.posts = data;
		});
	};

	PostController = function ($scope) {
		// $scope.$parent.title = "This is a sample post";
		// Stub
	};

	PostController.$inject  = ['$scope'];
	PostsController.$inject = ['$scope', 'PostsService'];

	angular.module('HNGBlog.posts').controller({
		"PostController":  PostController,
		"PostsController": PostsController,
	});

}());