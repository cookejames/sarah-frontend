//Gruntfile
module.exports = function(grunt) {
	global.jqueryUiTheme = 'cupertino';
	//set the global option isDev if given the --dev commandline parameter
	global.isDev = true;
	if (grunt.option('production')) {
		global.isDev = false;
	}

	// Plugin loading
    require('load-grunt-config')(grunt);

	// Task definition
	grunt.registerTask('default', ['less', 'cssmin', 'uglify', 'copy']);
};