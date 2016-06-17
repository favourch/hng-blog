(function () {
	'use strict';

	var app = angular.module('HNGBlog', [
		'ui.router',
		'hc.marked',
		'relativeDate',
		'HNGBlog.shared',
		'HNGBlog.posts',
	]);


	/**
	 * Configure UI Router. Here we set up the all the routes for our
	 * application.
	 *
	 * @param  {Object} $stateProvider
	 * @param  {Object} $urlRouterProvider
	 * @return {void}
	 */
	var uiRouterConfig = function ($state, $urlRouter, $provide, $window) {


		// -----------------------------------------------------------------------------
		// This fixes the issue with `ui-router` not scrolling to the top of views.
		// -----------------------------------------------------------------------------

		$provide.decorator('$uiViewScroll', function($delegate) {
			return function(uiViewElement) {
				if ($(uiViewElement).hasClass('main-ui-view')) { 
					$window.scrollTo(0, 0); 
				}
			};
		});


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
					$timeout(function(){ $state.go('home', {reload:true}) });
				}

			);

			return defer.promise;
		};
		postResolver.$inject = ['$q', '$state', '$timeout', '$stateParams', 'PostsService'];


		// -----------------------------------------------------------------------------
		// Fallback url, if url does not match any route.
		// -----------------------------------------------------------------------------

		$urlRouter.otherwise("/");


		// -----------------------------------------------------------------------------
		// Routes definition
		//
		// @todo Use `controller as` syntax to avoid scope soup.
		// @see http://www.technofattie.com/2014/03/21/five-guidelines-for-avoiding-scope-soup-in-angular.html
		// -----------------------------------------------------------------------------

		$state
			.state('home', {
				url: "/",
				controller: "PostsController as postsCtrl",
				templateUrl: "templates/posts.html"
			})
			.state('post', {
				url: '/post/{id}/{slug}',
				controller: "PostController as postCtrl",
				templateUrl: "templates/post.html",
				resolve: { post: postResolver }
			});
	};
	uiRouterConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$provide', '$window'];


	/**
	 * Markdown configuration.
	 *
	 * @param  {Object} markedProvider
	 * @return {void}
	 */
	var hcMarkdownConfig = ['markedProvider', function (markedProvider) {
		markedProvider.setOptions({
			gfm: true,
			tables: true,
			highlight: function (code, lang) {
				return lang
					? hljs.highlight(lang, code, true).value
					: hljs.highlightAuto(code).value;
			}
		});

		markedProvider.setRenderer({
			link: function(href, title, text) {
				var target = "";
				if (href.indexOf("://blog.hng.tech") === -1 || href.indexOf("://localhost") === -1) {
					target = " target='_blank'";
				}
				return "<a href='" + href + "'" + (title ? " title='" + title + "'" : '') + target +">" + text + "</a>";
			}
		});
	}];


	// Attach configuration...
	app.config(uiRouterConfig).config(hcMarkdownConfig);
}());
