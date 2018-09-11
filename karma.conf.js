// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage-istanbul-reporter'),
            require('karma-html-detailed-reporter'),
            require('karma-spec-reporter'),
            require('@angular-devkit/build-angular/plugins/karma')
        ],
        client:{
            captureConsole: true,
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },
        browserConsoleLogOptions: {
            level: 'log',
            format: '%b %T: %m',
            terminal: true
        },
        files: [
            
        ],
        preprocessors: {
            
        },
        mime: {
            'text/x-typescript': ['ts','tsx']
        },
        coverageIstanbulReporter: {
            dir: require('path').join(__dirname, 'coverage'), reports: [ 'html', 'lcovonly' ],
            fixWebpackSourcePaths: true
        },
        logLevel: config.LOG_LOG,
        
        reporters: ['progress', 'kjhtml'],
        specReporter: {
            suppressPassed: false,  // do not print information about passed tests
            suppressSkipped: true,  // do not print information about skipped tests
        },
        port: 9876,
        colors: true,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        customLaunchers: {
            ChromeHeadless: {
                base: 'Chrome',
                flags: [
                    // See https://chromium.googlesource.com/chromium/src/+/lkgr/headless/README.md
                    '--headless',
                    '--disable-gpu',
                    // Without a remote debugging port, Google Chrome exits immediately.
                    '--remote-debugging-port=9222'
                ]
            }
        }
    });
};
