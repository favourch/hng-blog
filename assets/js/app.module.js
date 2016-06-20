(function (CONFIG) {
	'use strict';
	var app;

	/**
	 * -----------------------------------------------------------------------
	 * APPLICATION MODULE
	 * -----------------------------------------------------------------------
	 *
	 * Declares the application module. This is the glue that holds all
	 * the site-wide modules together.
	 *
	 */

	app = angular.module('HNGBlog', [

		// Third-Party
		'ui.router',
		'hc.marked',
		'relativeDate',

		// System
		'HNGBlog.shared',
		'HNGBlog.posts',
	]);


	/**
	 * -----------------------------------------------------------------------
	 * UI-ROUTER CONFIGURATION
	 * -----------------------------------------------------------------------
	 *
	 * Configure UI-Router, set all the routes and provide fallbacks. Also
	 * setup resolvers for routes as required.
	 *
	 */

	app.config(['$stateProvider', '$urlRouterProvider', '$provide',
		function ($state, $urlRouter, $provide) {
			var postResolver;

			// -----------------------------------------------------------------------------
			// This fixes the issue with `ui-router` not scrolling to the top of views.
			// -----------------------------------------------------------------------------

			$provide.decorator('$uiViewScroll', function($delegate) {
				return function(uiViewElement) {
					if ($(uiViewElement).hasClass('main-ui-view')) {
						window.scrollTo(0, 0);
					}
				};
			});


			// -----------------------------------------------------------------------------
			// Resolve `post` to the route, or redirects to the home if not found.
			// -----------------------------------------------------------------------------

			postResolver = ['$q', '$state', '$timeout', '$stateParams', 'PostsService',
				function ($q, $state, $timeout, $stateParams, PostsService) {
					var defer, onSuccess, onFailure;

					defer = $q.defer();

					// Successful!
					onSuccess = function (post) {
						defer.resolve(post);
					};

					// Failed!
					onFailure = function (response) {
						defer.reject(response.data);

						// 404: Redirect to homepage...
						$timeout(function(){ $state.go('home', {reload:true}) });
					};

					// Call service...
					PostsService.get($stateParams.slug).then(onSuccess, onFailure);

					return defer.promise;
				}
			];


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
					url: '/post/{slug}',
					controller: "PostController as postCtrl",
					templateUrl: "templates/post.html",
					resolve: { post: postResolver }
				});
		}
	]);


	/**
	 * -----------------------------------------------------------------------
	 * MARKDOWN CONFIGURATION
	 * -----------------------------------------------------------------------
	 *
	 * We configure the markdown module here. Since we are using highlight.js
	 * and it comes bundled with the module, we can configure that here also.
	 * If you won't be using this, then feel free to uncomment it.
	 *
	 */

	app.config(['markedProvider', function (markedProvider) {

		// -----------------------------------------------------------------------------
		// Configure `highlight.js` to work with our Markdown module.
		// -----------------------------------------------------------------------------

		markedProvider.setOptions({
			gfm: true,
			tables: true,
			highlight: function (code, lang) {
				return lang
					? hljs.highlight(lang, code, true).value
					: hljs.highlightAuto(code).value;
			}
		});


		// -----------------------------------------------------------------------------
		// Force non-internal links in markdown to open in a new browser
		// -----------------------------------------------------------------------------

		markedProvider.setRenderer({
			link: function(href, title, text) {
				var target = "",
					title  = (title ? " title='" + title + "'" : '');

				if (href.indexOf("://blog.hng.tech") === -1 || href.indexOf("://localhost") === -1) {
					target = " target='_blank'";
				}

				return "<a href='" + href + "'" + title + target +">" + text + "</a>";
			}
		});
	}]);


	/**
	 * -----------------------------------------------------------------------
	 * REPOSITORY CONFIGURATION
	 * -----------------------------------------------------------------------
	 *
	 * Here you can configure the repository you are going to be using.
	 *
	 */

	app.config([function () {
		var repository = CONFIG.repository;

		switch (repository) {
			// Firebase
			case 'FirebaseRepository':
				firebase.initializeApp(CONFIG.firebase);
				break;

			// ...

			// No Matching Repository
			default:
				throw new Error("Invalid repository: " + repository);
		};
	}]);

}(window.hngBlogConfig));