var app = angular.module('app', [
      'ngSanitize',
      'ngRoute',
      'slugifier',
      'ui.bootstrap.typeahead',
      'ui.bootstrap.datepicker',
      'ui.bootstrap.timepicker',
      'ui.bootstrap.dropdownToggle'
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