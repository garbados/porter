var app = angular.module('app', [
      'ngSanitize',
      'ngRoute',
      'slugifier',
      'ui.bootstrap'
    ]),
    plugins = [
      require('./services'),
      require('./controllers'),
      require('./config')
    ];

plugins
  .forEach(function (plugin) {
    plugin(app);
  });