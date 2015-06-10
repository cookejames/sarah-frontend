module.exports = function(config){
  config.set({

    basePath : '../',

    files : [
      'dist/lib/angular/angular.js',
      'dist/lib/angular-new-router/dist/router.es5.js',
      'dist/lib/angular-mocks/angular-mocks.js',
      'dist/lib/traceur/traceur-runtime.js',
      'dist/lib/register.js',
      'dist/lib/restangular/dist/restangular.js',
      'dist/lib/lodash/lodash.js',
      'dist/js/app.js',
      'app/js/**/*Spec.js'
    ],
    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};