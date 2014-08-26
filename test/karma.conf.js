module.exports = function (config) {
	config.set({

		basePath: '../',

		files: [
			'bower_components/angular/angular.js',
			'bower_components/angular-mocks/angular-mocks.js',
			'bower_components/lodash/dist/lodash.compat.js',
			'bower_components/restangular/dist/restangular.js',
			'bower_components/angular-loading-bar/build/loading-bar.js',
			'node_modules/jasmine-expect/dist/jasmine-matchers.js',
			'app/**/*.js'
		],

		autoWatch: true,

		frameworks: ['jasmine'],

		browsers: ['PhantomJS', 'Firefox'],

		plugins: [
			'karma-phantomjs-launcher',
			'karma-chrome-launcher',
			'karma-firefox-launcher',
			'karma-jasmine',
			'karma-junit-reporter'
		],

		junitReporter: {
			outputFile: 'test_out/unit.xml',
			suite: 'unit'
		}

	});
};
