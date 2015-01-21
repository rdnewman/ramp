// Karma configuration
// Generated on Mon Jan 19 2015 20:06:49 GMT-0700 (MST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../../..',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    // frameworks: ['es5-shim', 'jasmine'],
    frameworks: ['jasmine-jquery', 'jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'spec/karma/polyfill/**/*.js',
      'tmp/react-rails/react.js',

      'app/assets/javascripts/**/*.js',
      'app/assets/javascripts/**/*.js.jsx',

      'spec/javascripts/**/*_spec.js'
    ],

    // list of files to exclude
    exclude: [
      '**/*~'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'app/assets/javascripts/**/*.js.jsx': ['react', 'coverage'],
      'app/assets/javascripts/**/*.js':     ['coverage']
    },
    reactPreprocessor: {
      transformPath: function(path) {
        return path.replace(/\.js\.jsx$/, '.js');
      }
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    // reporters: ['progress'],
    reporters: ['progress', 'coverage'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    // autoWatch: true,
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    //browsers: ['Chrome', 'PhantomJS', 'Firefox'],
    //browsers: ['PhantomJS', 'Chrome', 'Firefox'],
    browsers: ['PhantomJS'],
    //browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    // singleRun: false
    singleRun: true
  });
};
