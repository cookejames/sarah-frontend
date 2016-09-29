var gulp = require('gulp'),
    traceur = require('gulp-traceur'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    livereload = require('gulp-livereload'),
    plumber = require('gulp-plumber'),
    del = require('del'),
    runSequence = require('run-sequence'),
    ngConstant = require('gulp-ng-constant'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer');

gulp.task('clean', function (cb) {
    del(['dist/**/*'], cb);
});

gulp.task('copy_bower_libs', function(){
    return gulp.src('./bower_components/**/*', {base: './bower_components'})
        .pipe(gulp.dest('dist/lib'))
        .pipe(livereload());
});

gulp.task('copy_libs', function(){
    return gulp.src('./lib/*.js')
        .pipe(traceur())
        .pipe(gulp.dest('dist/lib'))
        .pipe(livereload());
});

gulp.task('copy_html', function(){
    return gulp.src('./app/**/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});

gulp.task('copy_traceur_runtime', function(){
    return gulp.src('./node_modules/traceur/bin/**/*.js')
        .pipe(gulp.dest('dist/lib/traceur'))
        .pipe(livereload());
});

gulp.task('traceur', ['build_config'], function() {
    return gulp.src(['!app/**/*Spec.js', 'app/**/*.js'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(traceur())
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'))
        .pipe(livereload());
});

gulp.task('copy_css', function () {
    gulp.src(['app/**/*.less'])
        .pipe(less())
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(concat('app.css'))
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});

gulp.task('build_config', function(){
    return gulp.src('config.json')
        .pipe(ngConstant({
            constants: {
                apiUrl: process.env.API_URL || 'http://localhost:3000/api',
                mqttConfig: {
                    host: process.env.MQTT_HOST || '127.0.0.1',
                    port: process.env.MQTT_PORT || '9001'
                }
            }
        })).pipe(gulp.dest('./app/js/components/config'))
});

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch('./app/**/*.js', ['traceur']);
    gulp.watch('./app/**/*.less', ['copy_css']);
    gulp.watch('./app/**/*.html', ['copy_html']);
    gulp.watch('./bower_components/**/*', ['copy_libs']);
});

gulp.task('default', function(cb){
    runSequence('clean', ['traceur', 'copy_bower_libs', 'copy_html', 'copy_traceur_runtime', 'copy_libs', 'copy_css']);
    cb();
});