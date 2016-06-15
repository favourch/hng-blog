(function () {
	'use strict';
	var PostsService, ServiceMethods = {};

	PostsService = function ($http) {
		var offset = 0,
			limit  = 10;

		/**
		 * Get a single post from the API.
		 *
		 * @param  {int} id
		 * @param  {Function} callback
		 * @param  {Function} onError
		 * @return {void}
		 */
		ServiceMethods.get = function (id, callback, onError) {
			$http.get('/assets/data/post.json').then(callback, onError);
		};

		/**
		 * Get posts from the API.
		 *
		 * @param  {Function} callback
		 * @return {void}
		 */
		ServiceMethods.paginated = function (callback) {
			$http.get('/assets/data/posts.json').then(function (response) {
				offset = offset + limit;
				callback(response.data);
			});
		};

		return ServiceMethods;
	};

	// Dependencies...
	PostsService.$inject = ['$http'];

	// Register...
	angular.module('HNGBlog.posts').factory('PostsService', PostsService);
}());