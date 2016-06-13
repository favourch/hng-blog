(function () {
	'use strict';
	var PostsService;

	PostsService = function ($http, $q) {

		return {
			getPost: function (id) {

			},

			getAllPosts: function () {
				var defer = $q.defer();

				$http.get('/assets/data.json').then(function (response) {
					defer.resolve(response.data);
				});

				return defer.promise;
			}
		}

	};

	PostsService.$inject = ['$http', '$q'];

	angular.module('HNGBlog.posts').factory('PostsService', PostsService);
}());