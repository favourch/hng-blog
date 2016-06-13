(function () {
	'use strict';

	var app = angular.module('HNGBlog', [
		'ui.router',
		'HNGBlog.shared',
		'HNGBlog.posts'
	]);


	app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

		// Fallback url...
		$urlRouterProvider.otherwise("/");

		// Routes...
		$stateProvider
			.state('home', {
				url: "/",
				controller: "PostsController",
				templateUrl: "templates/posts.html"
			});
	}]);

}());