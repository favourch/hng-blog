(function () {
	'use strict';

	window.hngBlogConfig = {

		/**
		 * -----------------------------------------------------------------------
		 * SITENAME
		 * -----------------------------------------------------------------------
		 */

		"siteName": "HNG.tech",


		/**
		 * -----------------------------------------------------------------------
		 * SITE DESCRIPTION
		 * -----------------------------------------------------------------------
		 */

		"siteDescription": "A HNG.tech Product.",


		/**
		 * -----------------------------------------------------------------------
		 * DEFAULT HEADER IMAGE
		 * -----------------------------------------------------------------------
		 *
		 * This is the default header image that will be loaded on your site.
		 *
		 */

		"defaultHeaderImage": "/assets/img/header.jpg",


		/**
		 * -----------------------------------------------------------------------
		 * DATA REPOSITORY
		 * -----------------------------------------------------------------------
		 *
		 * What repository the data would be fetched from. You can create a
		 * custom repository to use with an external API or whatever data source
		 * you decide to use.
		 *
		 */

		"repository": 'FirebaseRepository',


		/**
		 * -----------------------------------------------------------------------
		 * LOCAL REPOSITORY CONFIGURATION
		 * -----------------------------------------------------------------------
		 */

		 "local": {
		 	"dataPath": "/assets/data/",
		 },


		/**
		 * -----------------------------------------------------------------------
		 * FIREBASE REPOSITORY CONFIGURATION
		 * -----------------------------------------------------------------------
		 *
		 * Firebase configuration. You need to set up Firebase to get this
		 * configuration.
		 *
		 */

		"firebase": {
			"storageBucket": "appname.appspot.com",
			"authDomain":    "appname.firebaseapp.com",
			"databaseURL":   "https://appname.firebaseio.com",
			"apiKey":        "YOUR_API_KEY_HERE",
		},

	};

}());