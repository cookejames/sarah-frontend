module.exports = {
	options: {
		mangle: false,
		beautify: false,
		sourceMap: (global.isDev) ? true : false,
		sourceMapIncludeSources: true
	},
	development: {
		files: [
			{
				'public/js/app.js': [
					'bower_components/jquery/dist/jquery.js',
//					'bower_components/jquery-ui/ui/jquery-ui.js',
//					'bower_components/jquery-ui-touch-punch-valid/jquery.ui.touch-punch.js',
					'bower_components/rickshaw/vendor/d3.min.js',
					'bower_components/rickshaw/vendor/d3.layout.min.js',
					'bower_components/rickshaw/rickshaw.js',
					'bower_components/angular/angular.js',
					'bower_components/angular-loading-bar/build/loading-bar.js',
					'bower_components/lodash/dist/lodash.js',
					'bower_components/restangular/dist/restangular.js',
					'app/**/*.js',
					'!app/**/*_test.js'
				]
			}
		]
	}
}