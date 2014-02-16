module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['qunit'],
    files: [
      'src/*.js',
      'test/*.js'
    ],
    browsers: ['PhantomJS'],
    singleRun: true,
    reporters: ['progress', 'coverage'],
    preprocessors: { 'src/*.js': ['coverage'] }
  });
};