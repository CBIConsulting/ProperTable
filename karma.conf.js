module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS', 'Chrome', 'Firefox'],
    files: [
      'tests.webpack.js',
      {
        pattern: 'src/**/__tests__/*.js',
        included: false,
        served: false,
        watched: true
      }
    ],
    frameworks: ['jasmine'],
    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap', 'coverage'],
    },
    reporters: ['progress', 'notification', 'coverage'],
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
        ],
        postLoaders: [{ // << add subject as webpack's postloader
            test: /\.jsx$/,
            exclude: /(__tests__|node_modules|legacy)\//,
            loader: 'istanbul-instrumenter'
        }]
      },
      watch: true
    },
    webpackServer: {
      noInfo: true,
    },
    coverageReporter: {
      includeAllSources: false,
      check: {
        global: {
          excludes: ['node_modules/**/*.js', 'src/**/__tests__/*.js']
        }
      }
    }
  });
};