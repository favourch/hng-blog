(function () {
	'use strict';
	var FirebaseService, FirebaseRepository;

	/**
	 * -----------------------------------------------------------------------
	 * FIREBASE REPOSITORY SERVICE
	 * -----------------------------------------------------------------------
	 *
	 * This is a repository service that fetches posts using a Firebase.
	 *
	 */

	FirebaseRepository = ['$q', 'FirebaseService', function ($q, fb) {
		var PostEndpoints = {},
			AuthEndpoints = {};


		// -----------------------------------------------------------------------
		// AUTH METHODS
		// -----------------------------------------------------------------------

		AuthEndpoints.login = function (credentials) {
			// credentials = {username:"", password:""}
		};

		AuthEndpoints.signup = function (credentials) {
			// credentials = {name:"", username:"", email:"", password:""}
		};


		// -----------------------------------------------------------------------
		// POST METHODS
		// -----------------------------------------------------------------------

		/**
		 * Fetch a single post from the firebase.
		 *
		 * @param  {String} slug
		 * @return {Object}       Angular Promise
		 */
		PostEndpoints.get = function (slug) {
			var defer, post;

			defer = $q.defer();

			fb.post(slug).once('value', function (snapshot) {
				if (post = snapshot.val()) {
					post.slug = slug;
					defer.resolve(post);
					return;
				}

				defer.reject({ status: "error", message: "Post not found." });
			});

			return defer.promise;
		};

		/**
		 * Fetch objects from a Firebase. Paginated!
		 *
		 * @param  {Integer} offset
		 * @param  {Integer} limit
		 * @return {Object}  Angular Promise
		 */
		PostEndpoints.paginated = function (offset, limit) {
			var posts, postObject, lastFetchedId, postsFb, defer;

			defer   = $q.defer();
			postsFb = fb.posts().orderByChild('createdAt');

			// ----------------------------------------------------------------
			// Check to see if there is a last fetched record, if there is, use
			// that as the springboard to make paginated requests from the last
			// point.
			// ----------------------------------------------------------------

			if (lastFetchedId !== undefined) {
				postsFb = postsFb.startAt(null, lastFetchedId);
			}


			// ----------------------------------------------------------------
			// We are using Firebase methods to query the database. When we get
			// a value, we append it to the posts object.
			// ----------------------------------------------------------------

			postsFb.limitToFirst( limit + (lastFetchedId ? 1 : 0) )
				.once('value', function (snapshot) {
					posts = [];

					snapshot.forEach(function (post) {
						postObject      = post.val();
						postObject.slug = post.key;

						posts.push(postObject);

						// ----------------------------------------------------------------
						// Since we want to use the last fetched key to paginate and know
						// where we stopped last, we would just store it while looping,
						// then use it in the next request.
						// ----------------------------------------------------------------

						lastFetchedId   = post.key;
					});

					defer.resolve(posts);
				});

			return defer.promise;
		};


		// -----------------------------------------------------------------------
		// RETURN ALL ENDPOINTS
		// -----------------------------------------------------------------------

		return {
			auth:  AuthEndpoints,
			posts: PostEndpoints,
		};
	}];


	/**
	 * -----------------------------------------------------------------------
	 * FIREBASE SERVICE
	 * -----------------------------------------------------------------------
	 *
	 * Firebase Service with additional helpers defined.
	 *
	 */

	FirebaseService = [function () {
		return {
			// Firebase
			fb: firebase,

			// Firebase -> Database
			db: function () {
				return this.fb.database();
			},

			// Firebase -> Database -> Post Objects
			posts: function (path) {
				return this.db().ref('/posts' + (path ? "/" + path : ""));
			},

			// Firebase -> Database -> Post Objects -> Post
			post: function (slug) {
				return this.posts(slug);
			},
		};
	}];


	/**
	 * -----------------------------------------------------------------------
	 * REGISTER SERVICES
	 * -----------------------------------------------------------------------
	 */

	angular.module('HNGBlog.shared').service({
		'FirebaseService':    FirebaseService,
		'FirebaseRepository': FirebaseRepository,
	});
}());