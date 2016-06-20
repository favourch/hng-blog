(function () {
	'use strict';
	var PostController, PostsController;

	/**
	 * Post Controller - Displays a single post.
	 *
	 * @param  {Object} $scope
	 * @param  {Object} post
	 * @return {void}
	 */
	PostController = ['$scope', 'post', function ($scope, post) {
		$scope.post          = post;
		$scope.$parent.post  = post;
	}];

	/**
	 * Posts controller - Displays posts.
	 *
	 * @param  {Object} $scope
	 * @param  {Object} Posts
	 * @return {void}
	 */
	PostsController = ['$scope', 'PostsService', function ($scope, Posts) {
		$scope.posts        = false;
		$scope.$parent.post = false;

		Posts.paginated().then(function (data) {
			$scope.posts = data;
		});
	}];


	// Register controllers...
	angular.module('HNGBlog.posts').controller({
		"PostController":  PostController,
		"PostsController": PostsController,
	});
}());