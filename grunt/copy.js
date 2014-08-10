module.exports = {
    development: {
        files: [
            //copy bootstrap fonts
            {
                expand: true,
                flatten: true,
                cwd: 'bower_components/bootstrap/dist/fonts/',
                src: '**',
                dest: 'public/fonts/bootstrap/'
            },
            //copy jquery-ui images
            {
                expand: true,
                flatten: true,
                cwd: 'bower_components/jquery-ui/themes/' + global.jqueryUiTheme + '/images/',
                src: '**',
                dest: 'public/css/images/'
            },
			{
				src: 'app/app.html',
				dest: 'public/index.html'
			}
        ]
    }
}