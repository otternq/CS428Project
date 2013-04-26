// Karma configuration
// Generated on Fri Apr 05 2013 22:26:32 GMT-0700 (PDT)


// base path, that will be used to resolve files and exclude
basePath = '';


// list of files / patterns to load in the browser
files = [
  JASMINE,
  JASMINE_ADAPTER,
  REQUIRE,
  REQUIRE_ADAPTER,
  {pattern: 'src/public/data/**/*', included: false},
  {pattern: 'src/public/js/libs/app/*.js', included: false},
  {pattern: 'src/public/js/game.js', included: false},
  {pattern: 'src/public/js/libs/app/**/*.js', included: false},
  {pattern: 'tests/*.spec.js', included: false},
  'src/public/js/melonJS-0.9.4-min.js',
  'tests/main-test.js',
];

preprocessors = {
  'src/public/js/libs/app/*': 'coverage'
};


// list of files to exclude
exclude = [
  
];


// test results reporter to use
// possible values: 'dots', 'progress', 'junit'
reporters = ['dots'];

/*junitReporter = {
  outputFile: 'build/logs/karma-results/test-results.xml'
}

coverageReporter = {
  type : 'html',
  dir : 'build/coverage/'
}

coverageReporter = {
  type: 'cobertura',
  dir: 'build/coverage/',
  file: 'coverage.xml'
};*/


// web server port
port = 9876;


// cli runner port
runnerPort = 9100;


// enable / disable colors in the output (reporters and logs)
colors = true;


// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_INFO;


// enable / disable watching file and executing tests whenever any file changes
autoWatch = true;


// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)

//http://stackoverflow.com/questions/8683895/variable-to-detect-operating-system-in-node-scripts
switch(process.platform) {
	case 'darwin':
		browsers = ['Chrome'];
		break;
	default: 
		browsers = ['PhantomJS'];
		break;

}


// If browser does not capture in given timeout [ms], kill it
captureTimeout = 60000;


// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = false;
