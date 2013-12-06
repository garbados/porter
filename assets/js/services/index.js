var plugins = [
  require('./pouch'),
  require('./posts'),
  require('./markdown'),
  require('./autocomplete'),
  require('./summary')
];

module.exports = function (app) {
  plugins
    .forEach(function (plugin) {
      plugin(app);
    });
};