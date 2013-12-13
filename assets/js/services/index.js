var plugins = [
  require('./pouch'),
  require('./posts'),
  require('./markdown'),
  require('./autocomplete'),
  require('./summary'),
  require('./schemas'),
  require('./singularize')
];

module.exports = function (app) {
  plugins
    .forEach(function (plugin) {
      plugin(app);
    });
};