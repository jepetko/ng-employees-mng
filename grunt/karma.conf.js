module.exports = function(config) {

    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: '.',


        // frameworks to use
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            'node_modules/jquery/dist/jquery.js',
            'node_modules/angular/angular.js',
            'node_modules/angular-resource/angular-resource.js',
            'node_modules/angular-mocks/angular-mocks.js',

            //source code:
            '../app/assets/javascripts/employees/*.js',
            '../app/assets/templates/*.html',

            //tests:
            '../karma_tests/*.js'
        ],


        // list of files to exclude
        exclude: [
            //'js/whatever.js',
        ],


        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['progress', 'html'],

        htmlReporter: {
            outputFile: __dirname  + '/output.html',
            templatePath: __dirname + '/jasmine_template.html'
        },

        // generate js files from html templates
        preprocessors: {
            '../app/assets/templates/*.html': 'ng-html2js'
        },

        ngHtml2JsPreprocessor: {
            stripPrefix: '../app/assets/',
            moduleName: 'templates',
            cacheIdFromPath: function(filepath) {
                var cacheID = /\w+\.html$/g.exec(filepath);
                return cacheID[0];
            }
        },

        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera (has to be installed with `npm install karma-opera-launcher`)
        // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
        // - PhantomJS
        // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
        browsers: ['PhantomJS'],
        //browsers: ['Chrome'],
        captureTimeout: 5000,
        singleRun: true
    });
};