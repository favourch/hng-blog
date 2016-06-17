(function () {
	'use strict';

	var app = angular.module('HNGBlog', [
		'ui.router',
		'hc.marked',
		'HNGBlog.shared',
		'HNGBlog.posts',
	]);


	/**
	 * Configure UI Router. Here we set up the all the routes for our
	 * application.
	 *
	 * @var {Array}
	 */
	var uiRouterConfig = ['$stateProvider', '$urlRouterProvider', function ($state, $urlRouter) {

		/**
		 * Resolves post to the route, or redirects to the home if not found.
		 *
		 * @return {Object}
		 */
		var postResolver = function ($q, $state, $timeout, $stateParams, PostsService) {
			var defer = $q.defer();

			PostsService.get(

				// Post to fetch...
				$stateParams.id,

				// Success Callback...
				function(response) {
					defer.resolve(response.data);
				},

				// Error Callback...
				function (response) {
					defer.reject(response.data);

					// 404: Redirect back to the homepage...
					$timeout(function(){ $state.go('/', {reload:true}) });
				}

			);

			return defer.promise;
		};
		postResolver.$inject = ['$q', '$state', '$timeout', '$stateParams', 'PostsService'];


		// Fallback url...
		$urlRouter.otherwise("/");

		// Routes...
		$state
			.state('home', {
				url: "/",
				controller: "PostsController",
				templateUrl: "templates/posts.html"
			})
			.state('post', {
				url: '/post/{id}/{slug}',
				controller: "PostController",
				templateUrl: "templates/post.html",
				resolve: { post: postResolver }
			});
	}];


	// Attach configuration...
	app.config(uiRouterConfig);
}());