(function(CONFIG){
	'use strict';
	var PostsService,
		PostsServiceMethods = {};

	/**
	 * PostsService
	 *
	 * Handles all calls to the API and returns the response from the repository.
	 *
	 * @param {Object} $q
	 * @param {Object} repository
	 */
	PostsService = ['$q', CONFIG.repository, function ($q, repository) {
		var offset       = 0,
			resultsLimit = 10,
			isLastPage   = false;


		/**
		 * Get a single post using the slug.
		 *
		 * @param  {String} slug
		 * @return {Object}      Angular Promise
		 */
		PostsServiceMethods.get = function (slug) {
			var defer, onSuccess, onFailure;

			defer = $q.defer();

			// Failed!
			onFailure = function (data) {
				defer.reject(data);
			};

			// Succeeded!
			onSuccess = function (data) {
				defer.resolve(data);
			};

			// Call the repository...
			repository["posts"].get(slug).then(onSuccess, onFailure);

			return defer.promise;
		};


		/**
		 * Get Paginated Result For Posts.
		 *
		 * @param  {Integer} limit
		 * @return {Object}        Angular Promise
		 */
		PostsServiceMethods.paginated = function (limit) {
			var defer, onSuccess, onFailure;

			defer = $q.defer();
			limit = limit > 0 ? limit : resultsLimit;

			/**
			 * Callback on failure.
			 *
			 * @param  {Object} data
			 * @return {void}
			 */
			onFailure = function (data) {
				defer.reject(data);
			};

			/**
			 * Callback on success.
			 *
			 * @param  {Object} data
			 * @return {void}
			 */
			onSuccess = function (data) {
				offset     = offset + limit;
				isLastPage = data.length < limit;

				defer.resolve(data);
			};

			// Call the paginate on the post repository...
			repository["posts"].paginated(offset, limit).then(onSuccess, onFailure);

			return defer.promise;
		};

		return PostsServiceMethods;
	}];

	angular.module('HNGBlog.posts').factory('PostsService', PostsService);
}(window.hngBlogConfig));