module.exports = {
	options: {
		keepSpecialComments: 0
	},
    combine: {
        files: {
            'public/css/app.css': [
                'assets/css/**/*.css',
                    'bower_components/jquery-ui/themes/' + jqueryUiTheme + '/jquery-ui.css',
                'bower_components/rickshaw/rickshaw.css',
				'bower_components/angular-loading-bar/build/loading-bar.css',
                'public/css/app.css'
            ]
        }
    }
}