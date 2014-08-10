module.exports = {
    javascript: {
        files: [
            'app/**/*.js'
        ],
        tasks: ['newer:uglify']
    },
    less: {
        files: [
            'app/**/*.less'
        ], //watched files
        tasks: ['less', 'cssmin']
    },
    css: {
        files: [
            'app/**/*.css'
        ], //watched files
        tasks: ['less', 'cssmin']
    },
	html: {
		files: [
			'app/**/*.html'
		],
		tasks: ['newer:copy']
	},
    public_html: {
        files: [
            'public/**/*.{css,js}'
        ],
        options: {
            livereload: true
        }
    }
}